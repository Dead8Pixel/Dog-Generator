const BREED_URL = "https://dog.ceo/api/breeds/list/all";

const doggos = document.querySelector(".doggos");
const doglist = document.querySelector("#breeds");
let img = null;
let loading  = null;

const promise = fetch(BREED_URL);
promise
.then(function(response) {
    const prospromise= response.json();
    return prospromise;
})
.then(function(prosresp){
    const values = prosresp.message;
    Object.keys(values).forEach(e => {
        //If the breed has sub breeds
        if(values[e].length > 0) {
            values[e].forEach(f => {
                const opt = document.createElement("option");
                opt.value = e+ "/" + f;
                opt.innerText = (f + " " + e).toUpperCase();
                doglist.appendChild(opt);
            });
        }
        //IF the breed doesnt have sub breeds
        else {
        const opt = document.createElement("option");
        opt.value = e;
        opt.innerText = e.toUpperCase();
        doglist.appendChild(opt);
        }
    })

    
});

function addNewDoggo() {
  if (img != null) doggos.removeChild(img);
  loadinggif();
  const promise = fetch(`https://dog.ceo/api/breed/${doglist.value}/images/random`);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      doggos.removeChild(loading);
        img = document.createElement("img");
        img.src = processedResponse.message;
        img.alt = "Cute doggo";
        img.width = "600";
        img.height = "450"
        img.style.border = "5px solid black"
        img.style.marginTop = "5px";
        doggos.appendChild(img);
      
    });
}

function loadinggif() {
    loading = document.createElement("img");
    loading.src = "./loading.gif";
    loading.alt = "loading gif";
    loading.width = "50";
    loading.height = "50";
    doggos.appendChild(loading);
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);