
const sections = document.querySelectorAll('section');// take all section 
const navBar = document.querySelector('#navbar-list');
const logoDiv = document.querySelector('.logo');


// add menu link depend on section dynamically
function addSection(){
    for(let item of sections){
        let navList = document.createElement('li');
        let  navLink = document.createElement('a');
        navLink.setAttribute('href',"#"+item.id)
        navList.dataset.nav= item.id;
        navList.className ="liStyle";
        navLink.className = "linkStyle ";
        let linkText = document.createTextNode(item.dataset.nav);
        navLink.appendChild(linkText);
        navList.appendChild(navLink);
        navBar.appendChild(navList);
    }
    
}

const menuTab =document.querySelector("#menuTab");
const navbarList = document.querySelector(".overlay");

//when you click link in menu give active class
menuTab.addEventListener("click",function(){ 
       navbarList.classList.toggle("active");
})
addSection();

let firstElementLink = document.getElementsByTagName('a')[1];
firstElementLink.classList.add('active');


// change navigation style on scroll 
window.addEventListener('scroll',event=>{
       
     const header = document.querySelector('#header');
     
     (window.scrollY>=44) ? header.classList.add('scroll') : header.classList.remove('scroll');
});


// active navigation on scroll
window.addEventListener('scroll',event=>{
    let  navigationLinks = document.querySelectorAll('nav li a');
     let fromTop = window.scrollY+300;

   // give shadow activation effect to section element
     navigationLinks.forEach(link =>{
         let section=document.querySelector(link.hash);// it's meaning hash take href attr #1 for example 
         
         if (
              section.offsetTop <= fromTop && // start from section top add to active class
              section.offsetTop + section.offsetHeight > fromTop //remove avtive class when the leave section
               
            ){
                link.classList.add('active'); // give the active class to the link
               // section.firstElementChild.classList.add('shadow');    
            }
            else{
                link.classList.remove('active');
              //   section.firstElementChild.classList.remove('shadow');
                
            }
     })

});

 // get all a links in header section 

 let  allLink = document.querySelectorAll('a');

// navigation to section 
allLink.forEach(element=> element.addEventListener('click',smoothScroll));

function smoothScroll(e){
    e.preventDefault();
     const targetId = event.currentTarget.getAttribute('href');
     // window scrollTo()function

     window.scrollTo({
         top:targetId ==='#'? 0: document.querySelector(targetId).offsetTop,
         behavior : 'smooth'
     })
}


// slider start here 

const slides= document.querySelector(".slider").children;
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

// when clicked prev button section call below functions 
prev.addEventListener("click",function(){
    prevSlide();
    updateCircleIndicator();
    resetTimer();
});
// when clicked next button section call below functions 
next.addEventListener("click",function(){
    nextSlide();
    updateCircleIndicator();
    resetTimer();
});


// create circle indicator 
function circleIndicator(){
    for (let i=0;i<slides.length;i++){
        const div = document.createElement('div');
        div.innerHTML = i+1; // i start 0 
        div.id = i;
        div.setAttribute("onclick","indicateSlide(this)");
        if(i==0){
            div.className ="active";
        }
        indicator.appendChild(div);
    }   
}

 function indicateSlide(element){
        index =element.id;
        changeSlide();//  connect main slide by id and index number 
        updateCircleIndicator() // give active class to indicators 
        resetTimer();
 }

circleIndicator();

function updateCircleIndicator(){
    for(let i=0;i<indicator.children.length;i++){  // indicator.children.length; - give the massive element    
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active"); // give the indicator active classes when you click
}

function prevSlide(){
    if(index == 0){
        index =slides.length-1;
    }else{
        index --;
    }
      changeSlide();
}

function nextSlide(){
    if(index == slides.length -1){
        index =0;
    }else{
        index ++;
    }

      changeSlide();
}



function changeSlide(){

    // remove active class from all slide element 
    
    for(let slide of slides){
        slide.classList.remove("active");
    }

    //add active class current slide 
    slides[index].classList.add("active");
}


function resetTimer() { // when the click indicators 0r controls button stop timer
    clearInterval(timer);
    // then started timer again
    timer =  setInterval(autoPlay,4000);

}

function autoPlay(){ //auto play 
    nextSlide();
    updateCircleIndicator();
}
let timer = setInterval(autoPlay,4000);



 
 