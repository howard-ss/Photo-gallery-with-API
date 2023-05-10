const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage (){
   const inputValue = document.getElementById("input").value;

   if(inputValue > 10 || inputValue < 1){
    // alert("please enter a number between 1 and 10")
     errorMessageEl.style.display = "block"; 
     errorMessageEl.innerText ="Number should be between 1 and 10"
     return;   
   }
   
   imgs = "";

   try {
       btnEl.style.display = "none";
       const loading = `<img src="spinner.svg" />`;
       galleryEl.innerHTML = loading;
       await fetch(
          `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=TjvvFwxznfrhvygkWRyfN9_4VdCcuQUP4MpH7YLoPig`
        )
          .then((res) => res.json().then((data) => {
            // console.log(data);
            if(data){
                data.forEach((element) => {
                   // console.log(element.urls.small);
                   imgs += `<img src="${element.urls.small}" alt="image">`;
                   galleryEl.style.display = "block";
                   galleryEl.innerHTML = imgs;
                   btnEl.style.display = "block";
                   errorMessageEl.style.display = "none";
             });
            }
           })
        );
     
         
    
   } catch (error) {
     errorMessageEl.style.display = "block";
     errorMessageEl.innerText = "An error happened, try again later";
     btnEl.style.display = "block";
     galleryEl.style.display = "none";
   }


}

btnEl.addEventListener("click", fetchImage);