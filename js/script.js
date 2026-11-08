console.log("script.js connected!");

//select the container, button and inputs
let gif_container = document.querySelector("#gif-container");
let fetch_gif_btn = document.querySelector("#fetch-gif-btn");
let search_input = document.querySelector("#search-input");
let api_key_input = document.querySelector("#api-key");
let status_text = document.querySelector("#status-text");

//fetch the GIFs when the button is clicked
fetch_gif_btn.addEventListener("click", async function() {
    let api_key = api_key_input.value.trim();
    let search_term = search_input.value.trim();

    if(api_key === "") {
        status_text.textContent = "Please enter your Giphy API key first.";
        return;
    }

    //use a default search if the input is empty
    if(search_term === ""){
        search_term = "running";
    }

    let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(api_key)}&q=${encodeURIComponent(search_term)}&limit=12&rating=g`;
    gif_container.innerHTML = "";
    status_text.textContent = "Loading GIFs...";
    fetch_gif_btn.disabled = true;

    try {
        let response = await fetch(endpoint);
        if(!response.ok) {
            throw new Error("The request failed.");
        }
        let data = await response.json();
        let images = [];

        //store the original image URLs in an array
        for(let i = 0; i < data.data.length; i++){
            images.push(data.data[i].images.original.url);
        }
        console.log(images);

        //display the GIFs on the page
        for(let i = 0; i < images.length; i++){
            let image = document.createElement("img");
            image.src = images[i];
            image.alt = data.data[i].title || "GIF from Giphy";
            image.className = "col-3 mb-3";
            gif_container.appendChild(image);
        }

        if(images.length === 0){
            status_text.textContent = "No GIFs found, try another search.";
        } else{
            status_text.textContent = "GIFs loaded!";
        }
    } catch(error){
        status_text.textContent = "Error loading GIFs, please check your API key, connection and then try again.";

    } finally{
        fetch_gif_btn.disabled = false;
    }
});
