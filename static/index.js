
function getSTreams(){
    let req = new XMLHttpRequest();
    document.getElementsByClassName("loadresolution")[0].style.display = 'block'
    document.getElementsByClassName("resotexte")[0].style.display = 'block'
    while (document.getElementsByClassName('videoresolution')[0].firstChild) {
        document.getElementsByClassName('videoresolution')[0].removeChild(document.getElementsByClassName('videoresolution')[0].firstChild);
    }
    req.onreadystatechange = () =>{
        if( req.readyState === 4){
            var data = JSON.parse(req.responseText)
            if(data[0] != 'erreur'){
                console.log(data)
                document.getElementsByClassName("loadresolution")[0].style.display = 'none'
                for (const i in data.streams){
                    let bt = document.createElement('button')
                    bt.setAttribute('onclick' , 'file(\''+data.titre+'\',\''+data.streams[i].url+'\')')
                    bt.textContent = data.streams[i].res
                    document.getElementsByClassName('videoresolution')[0].appendChild(bt)
                }
            }else{
                console.log(data)
                document.getElementsByClassName("loadresolution")[0].style.display = 'none'
                document.getElementsByClassName("resotexte")[0].style.display = 'none'
                par = document.createElement('p')
                par.innerText = 'Erreur lors de la recherche des resolution' 
                document.getElementsByClassName('videoresolution')[0].appendChild(par)
                console.log("error")
            }
        }
    }
    let params = "url="+document.getElementById('saisie').value
    req.open('GET' ,'/stream?'+params)
    req.send()
    document.getElementsByClassName('resolutionPopup')[0].style.display = 'block'
}

function file(filename , url) {
    const link = document.createElement('a');
    link.href = url;
    //link.download = ;
    link.setAttribute('download' , filename)
    //link.target="_blank"
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

