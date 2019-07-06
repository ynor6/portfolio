
const  projectDirNames = ["elders", "finals", "luka", "magical", "recipes"]
const projectNames = ["elder share a skill"," book trailers", "studio luka", "magical creatures", "recipes index"];
const descriptions = ["A social platform made to connect skilled pensioners to younger people. Through the service, the students can lookup teachers by skill and location and setup meetings via the websites chat or message board.",
    "My final project for the Shenkar College of Engineering and Design, Featuring 4 animated trailers for some of my favorite books from the “Other Proza” series.",
    "A collection of designs made during my time in Luka Environmental Graphic Design Studio, where I was in charge for the designs for multiple projects, and the studios video art content.",
    "An experimental AirBnB like service. The service allows ‘rental’ of supernatural creatures. Browse available creatures, look at their skills and rent the one that suits you most, if it’s currently available", "A web-app that lets you search a variety of cooking sites for recipes from any cuisine, save your favorite ones, then cook them while the app adjusts the quantities to the number of servings needed"];
const createdWith = ["CSS / HTML / JS / RUBY ON RAILS/ FIGMA",  "After effects / Photoshop / Illustrator", "After effects / photoshop / illustrator / indesign", "ruby on rails / js / css / html / figma", "JS / bubble / npm"];
const webLinks = ["VISIT ELDER SHARE A SKILL", "Watch the book trailers", "Visit studio Luka", "Visit magical creatures", "Visit recipes index"];
let currentIndex = 0;

const getProjectIndexFromLocation = () => {
    let hash = window.location.hash;
    let number =  hash.substring(1);
    if (number) {
        return parseInt(number, 10);
    }
    return 1;
}

const loadPage = () => {
    let index = getProjectIndexFromLocation();
    swapProject(index - 1);
};

// const getChildIndex = (child) => {
//     let parent = child.parentNode;
//     let children = parent.children;
//     let i = children.length - 1;
//     for (; i >= 0; i--){
//         if (child == children[i]){
//             break;
//         };
//     };
//     return i;
// };

const swapCarousellLinks = (oldIndex, newIndex) => {
    a = document.querySelectorAll(".carousel-cell-image");

    a.forEach((cell) =>  {
        cell.outerHTML = cell.outerHTML.replace(projectDirNames[oldIndex], projectDirNames[newIndex]);
    });


    flkty = Flickity(document.querySelector(".carousel"))
    flkty.select(0, false, false); // move to the first slide
}

const swapCarousell = (isNext, currentProject) => {
    if (isNext) {
        if (currentProject.nextElementSibling === null){
            return;
        }
        currentProject.nextElementSibling.classList.add("active")
    }
    else if(currentProject.previousElementSibling === null){
        return
    }
    else {
        currentProject.previousElementSibling.classList.add("active")
    }
    currentProject.classList.remove("active")
}

const swapTexts = (newIndex) => {
    const projectName = document.querySelector(".project-name");
    const description = document.querySelector(".description-p");
    const madeWith = document.querySelector(".made-with");
    const webLink = document.querySelector(".web-link");
    const projectNum = document.querySelector(".project-num");

    if (newIndex < 0 ||  newIndex > 4){
        return;
    }
    
    projectName.innerHTML = projectNames[newIndex];
    description.innerHTML = descriptions[newIndex];
    madeWith.innerHTML = createdWith[newIndex];
    webLink.innerHTML = webLinks[newIndex];
    projectNum.innerHTML = `${newIndex+1} / 5`
}

const swapProject = (newIndex) => {
    if (newIndex > 4 || newIndex < 0) {
        return;
    }
    swapCarousellLinks(currentIndex, newIndex);
    // swapCarousell(isNext, currentProject)
    swapTexts(newIndex);
    currentIndex = newIndex;

}

// function swaparrows(obj, i1, i2) {
//     var src = obj.getAttribute('src');
  
//     if (src.match(i1))
//       obj.setAttribute('src', i2);
//     else
//       obj.setAttribute('src', i1);
//   }