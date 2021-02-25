/* global console,alret,prompt */
var moodIcon = document.getElementById("sun"),
    addItem = document.getElementById("add"),
    inputValue = document.getElementById("inputBar"),
    itemCount = 0,
    counter = 0,
    list = document.getElementsByClassName("list")[0],
    printNumberOfItems = document.getElementsByClassName("numberOfItem")[0];
moodIcon.onclick = function(){
    if(moodIcon.src == "https://trusting-galileo-1c552d.netlify.app/icon-sun.svg"){
        moodIcon.src = "icon-moon.svg";
        document.querySelector("span").className="light";
        document.querySelector("body").style = "background-color: rgb(231, 224, 224)";
        document.getElementById("changeMood").innerHTML="click to dark mood";
    }
    else{
        moodIcon.src = "icon-sun.svg";
        document.querySelector("span").className="dark";
        document.querySelector("body").style = "background-color: rgb(1, 4, 32)";
        document.getElementById("changeMood").innerHTML="click to light mood";
    }
}
window.onload = function(){
    inputValue .focus();
    alert("Thank you for using TODO website note that we allowed you to make at most 13 homeworks at the day,don't work hard!");
}
function animationButton(){
    addItem.classList.add("addRemoveAnimation");
}
addItem.onclick = function(){
    var newText = inputValue.value;

    if(newText === ""){
        inputValue.style="border:solid red 5px;";
        inputValue.value="";
        inputValue.placeholder="You can't add empty list!!!";
    }
    else if(itemCount>12 && document.getElementsByClassName("display").length == 0){
        alert("You reach the maximum number of working today , that's not healthy!!");
        inputValue.value="";
        inputValue.style="border:none";
        inputValue.placeholder="type what you think to do...";
    }
    else if(document.getElementsByClassName("display").length != 0 && itemCount > 12){
        for(var current = 0 ; current < itemCount ; current++){
            if(document.getElementById("item"+current).classList.contains("display")){
                inputValue.style="border:none";
                inputValue.placeholder="type what you think to do...";
                var item = document.getElementById("item"+current);
                item.classList.remove("display" , "deleted");


                document.getElementById("text"+current).innerHTML = newText;
                inputValue.value="";
                counter++;
                printNumberOfItems.innerHTML = counter + " items left";
                break;
            }
        }
    }
    else{
            list.classList.remove("visibility");
            inputValue.style="border:none";
            inputValue.placeholder="type what you think to do...";
            var item = document.getElementById("item"+itemCount);
            item.classList.remove("display" , "deleted");

            document.getElementById("text"+itemCount).innerHTML = newText;
            counter++;
            printNumberOfItems.innerHTML = counter + " items left";
            inputValue.value="";
            itemCount++;
    }
}
function complete(numberOfItem){
    var item = document.getElementById("item"+numberOfItem);

    item.children[0].classList.remove("fa-circle");
    item.children[0].classList.add("fa-check-circle");

    item.children[1].style = "text-decoration: line-through";
    item.classList.add("complete");
}
function deleteItem(numberOfDeleteingItem){
    if(confirm("Do you want to remove this item?")){
        var item = document.getElementById("item"+numberOfDeleteingItem);
        item.children[0].classList.remove("fa-check-circle");
        item.children[0].classList.add("fa-circle");
        item.children[1].style = "text-decoration: none";

        item.className = "display";
        item.classList.add("deleted");
        counter--;
        printNumberOfItems.innerHTML = counter + " items left";
    }

    if(counter == 0)
        list.classList.add("visibility");
}
function allEvevntClick(){
    document.getElementById("all").classList.add("click");
    document.getElementById("active").classList.remove("click");
    document.getElementById("complete").classList.remove("click");
    for(var i = 0 ; i < itemCount ; i++)
        if(!document.getElementById("item"+i).classList.contains("deleted"))
            document.getElementById("item"+i).classList.remove("display");
        printNumberOfItems.innerHTML = counter + " items left";       
}
document.getElementById("complete").onclick = function(){
    allEvevntClick();
    this.classList.add("click");
    document.getElementById("active").classList.remove("click");
    document.getElementById("all").classList.remove("click");
    for(var i = 0 ; i < itemCount ; i++){
        if(!document.getElementById("item"+i).classList.contains("complete"))
            document.getElementById("item"+i).classList.add("display");
    }
    printNumberOfItems.innerHTML = document.getElementsByClassName("complete").length + " items left";
}
document.getElementById("active").onclick = function(){
    allEvevntClick();
    this.classList.add("click");
    document.getElementById("complete").classList.remove("click");
    document.getElementById("all").classList.remove("click");
    printNumberOfItems.innerHTML = (counter - document.getElementsByClassName("complete").length) + " items left";
    for(var i = 0 ; i < itemCount ; i++){
        if(document.getElementById("item"+i).classList.contains("complete")){
            document.getElementById("item"+i).classList.add("display");
        }
    }
}
document.getElementsByClassName("clearCompleted")[0].onclick = function(){
    if(document.getElementsByClassName("complete").length == 0){
        alert("There is no items to delete it!");
    }
    else{
        if(confirm("Do you want to remove all completed items?")){
            for(var i = 0 ; i < itemCount ; i++){
                var item = document.getElementById("item"+i);
                if(item.classList.contains("complete")){
                    item.children[0].classList.remove("fa-check-circle");
                    item.children[0].classList.add("fa-circle");
                    item.children[1].style = "text-decoration: none";
                    item.className = "display";
                    item.classList.add("deleted");
                    counter--;
                    printNumberOfItems.innerHTML = counter + " items left";
                }
            }
        }
    }
}
