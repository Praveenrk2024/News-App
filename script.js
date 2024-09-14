let cont = document.querySelector(".cont");
const optconatiner = document.querySelector(".option-container");
const country = "us";
const options = ["general","entertainment","health","science","sports","technology"];


 let requesturl;

 const generateUI = (articles) =>  
{
    for(let item of articles)
        {
            console.log(item)
            let card = document.createElement("div");
            card.classList.add("news-card");
            card.innerHTML =`<div class="news-image-container"><img src="${item.urlToImage || "./newspaper.jpg"}" alt="" /></div>
            <div class ="news-content">
                <div class = "news-title">
                    ${item.title}
                </div>
                <div class="news-description">
                    ${item.description || item.content || ""}
                </div>
                <a href = "${item.url}" target = "_blank" class="view-button">Read More</a>
            </div>`;
        cont.appendChild(card);
        }
        
    
};

const getNews = async () =>{
    cont.innerHTML ="";
    let response = await fetch(requesturl);
    if(!response.ok){
        alert("Data Not Available at the moment,Please Try again Later");
        return false;
    }

    let data = await response.json();
    console.log(data);
    generateUI(data.articles);
};

const selectcategory = (e,category) =>{
    let options = document.querySelectorAll(".option");
    options.forEach((element)=>{
        element.classList.remove("active");
        
    });
    requesturl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}`;
    e.target.classList.add("active");
    getNews();
};

const createOptions = ()=>{
    for (let i of options){
        optconatiner.innerHTML+= `<button class="option ${i=="general" ? "active" :""}" onclick="selectcategory(event,'${i}')">${i}</button>`;
    }
};


const init = () =>{
    optconatiner.innerHTML = "";
    getNews();
    createOptions();
};


window.onload = ()=>{
    requesturl = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${api_key}`;
    init();     
};

