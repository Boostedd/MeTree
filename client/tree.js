const urlParams = new URLSearchParams(window.location.search);

async function getTree(){
    const titleObj = document.getElementById('title');
    const linksObj = document.getElementById('links');
    //const descriptionObj = document.getElementById('description');
    const doc = await httpGet("https://me-tree.herokuapp.com/get/tree/" + urlParams.get('id'));

    const docJson = JSON.parse(doc);
    titleObj.innerText = docJson.title;
    const links = docJson.links.split("~");
    linksObj.innerHTML = "";
    for(i = 0;i<links.length;i+=2){
        linksObj.insertAdjacentHTML( 'beforeend', '<a href="' + links[i+1] + '" target="_blank"><li><button href="' + links[i+1] + '">' + links[i] + '</button></li></a>' );
    }
    //descriptionObj.innerText = note;
}

getTree();
console.log("test");

// Get request at url function
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}