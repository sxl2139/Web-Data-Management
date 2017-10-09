// Put your Last.fm API key here
var api_key = "cfe92f06b7f528cf1a45005950f79333";

function sendRequest () {

  /*method to get info of artist*/
    var xhr = new XMLHttpRequest();
    var method1 = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method1+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var obj = JSON.parse(str);
            /*bind image*/
            document.getElementById("imgsrc").src = obj.artist.image[2]["#text"];
            /*bind name*/
            document.getElementById("name").innerHTML="<br/>"+obj.artist.name;
            /*bind summary*/
            document.getElementById("bio").innerHTML =  obj.artist.bio.content ;
            /*bind last fm url*/
            document.getElementById("url").href =  obj.artist.url ;
            document.getElementById("url").innerHTML = obj.artist.url ;
            document.getElementById("res").hidden = false;
        }
    };
    xhr.send(null);

    /*method to get top albums of artist*/
    var xhr1 = new XMLHttpRequest();
    var method2 = "artist.getTopAlbums";
    xhr1.open("GET","proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr1.onreadystatechange = function(){
        if(this.readyState==4){
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var obj = JSON.parse(str);
          var images = obj.topalbums.album;
          var div = document.getElementById('topalbums');
          var text = "<ul>";
          /*remove information of previous singer*/
          while (div.firstChild) {
              div.removeChild(div.firstChild);
          }
          var albums =document.createElement("p");
          for(var i=0;i<images.length;i++){
            var innerdiv =document.createElement("div");
            var img=document.createElement("img");
            img.src=images[i].image[2]["#text"];
            img.style = "float:left;padding:15px;";
            var label = document.createElement("label");
            label.innerHTML=images[i].name;
            label.width = "100px";
            var br = document.createElement("br");
            /*bind images and names*/
            if(images[i].image[2]["#text"] != ""){
              innerdiv.appendChild(label);
              innerdiv.appendChild(img);
              div.appendChild(br);
              div.appendChild(innerdiv);
            }else if(images[i].name!="(null)" && images[i].name!="<Unknown>"){
              text += "<li>" + images[i].name + "</li>";
            }
          }
          text += "</ul>";
          /*bind only names if images are not available*/
          if(div.childNodes.length==0){
            albums.innerHTML=text;
            div.appendChild(albums);
          }
        }
    };
    xhr1.send(null);

    /*method to get similar artist*/
    var xhr2 = new XMLHttpRequest();
    var method3 = "artist.getSimilar";
    xhr2.open("GET","proxy.php?method="+method3+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr2.onreadystatechange = function(){
        if(this.readyState==4){
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          var obj = JSON.parse(str);
          var artists = obj.similarartists.artist;
          var div = document.getElementById('similarArtists');
          /*remove information of previous singer*/
          while (div.firstChild) {
              div.removeChild(div.firstChild);
          }
          /*bind names of similar artists*/
          for(var i=0;i<artists.length;i++){
            var label = document.createElement("label");
            var br = document.createElement("br");
            label.innerHTML=artists[i].name;
            div.appendChild(label);
            div.appendChild(br);
          }
        }
    };
    xhr2.send(null);

}
