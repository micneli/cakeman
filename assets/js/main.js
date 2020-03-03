// **************** RANDOM MOVEMENTS OF BOXES ********************* //

// const rival = document.getElementsByClassName("rival");

// const rivalUpDown = parseInt(window.getComputedStyle(rival,null).getPropertyValue("top"));
// const rivalLeftRight = parseInt(window.getComputedStyle(rival,null).getPropertyValue("left"));

// let rivalUpDownMovement = [rivalUpDown, rivalLeftRight];

// let step = [moveBy, -moveBy];

// setInterval(function() {
//     for(let i = 0; i < rival.length; i++) {
//         let randomMovement = rivalUpDownMovement[Math.floor(Math.random() * rivalUpDownMovement.length)];
//         let randomStep = step[Math.floor(Math.random() * step.length)];

//         if(randomMovement == rivalUpDown && rivalUpDown > 50 && rivalUpDown < 650) {
//         rival.style.top = rivalUpDown + randomStep + 'px';
//         }
//         if(randomMovement == rivalLeftRight && rivalLeftRight > 50 && rivalLeftRight < 650) {
//         rival.style.left = rivalLeftRight + randomStep + 'px';
//         }
//     }
// }, 1000);



//************************ START **********************8*/
//le terrain de jeu
const gameBoard = document.getElementById("gameBoard");

//notre personnage
const player = document.getElementById("player");

//tableau des directions possibles (on s'en sert dans la fonction move)
const directions = ["up", "down", "left", "right"];

//tableau qui contient nos ennemis /!\ en utilisant une syntaxe ES6 (spred operator ...), j'ai pu facilement changer une variable de type HTMLCollection en Array, ce qui me permet d'utiliser la méthode splice facilement après.
const ennemies = [...document.getElementsByClassName("ennemi")];

//fonction qui permet de récupérer la valeur calculée d'une propriété CSS d'un élément HTML 
function getComputedStyleInteger(element, property) {
    //sinon, on peut utiliser : offsetLeft et offsetTop ! Je continue avec cette technique tout le reste du code perso
    return parseInt(window.getComputedStyle(element).getPropertyValue(property));
}

//fonction pour obtenir un nombre aléatoire compris entre min et max
function getRandomIntBetweenRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction pour faire bouger un élément dans notre espace de jeu
function move(element, direction) {
    //top et left de l'élément à bouger
    const leftElement = getComputedStyleInteger(element, "left");
    const topElement = getComputedStyleInteger(element, "top");

    //les faire bouger selon la direction passé
    switch (direction) {
        case "up":
            if (topElement > 0) {
                element.style.top = topElement - 50 + "px";
            }
            break;

        case "down":
            if (topElement < 700) {
                element.style.top = topElement + 50 + "px";
            }
            break;

        case "left":
            if (leftElement > 0) {
                element.style.left = leftElement - 50 + "px";
            }
            break;

        case "right":
            if (leftElement < 700) {
                element.style.left = leftElement + 50 + "px";
            }
            break;
    }
}

//fonction qui sert à détecter une collision entre l'explosion et les ennemis
function detectionExplosion(bomb) {
    //top et left de ma bombe
    const bombTop = getComputedStyleInteger(bomb, "top");
    const bombLeft = getComputedStyleInteger(bomb, "left");

    //on vérifie pour chaque ennemi s'il est dans le périmètre de la bombe, c'est à dire plus des maths qu'autre chose dans ce cas
    for (let i = 0; i < ennemies.length; i++) {
        7
        //top et left d'un ennemi (et on boucle sur tous, donc on aura toutes leur position)
        const ennemiTop = getComputedStyleInteger(ennemies[i], "top");
        const ennemiLeft = getComputedStyleInteger(ennemies[i], "left");

        //Si notre ennemmi est dans le périmètre de la bombe (donc touché)
        if ((ennemiTop >= bombTop && ennemiTop <= bombTop + 100) && (ennemiLeft >= bombLeft && ennemiLeft <= bombLeft + 100)) {
            //on enlève notre ennemi du plateau de jeu, on enlève un élément HTML
            gameBoard.removeChild(ennemies[i]);
            //on enlève notre ennemi touché du tableau des ennemis
            ennemies.splice(i, 1);
            //si notre tableau des ennemis est vide, nous avons gagné
            if (ennemies.length <= 0) {
                console.log("Vous avez gagné !");
            }
        }
    }

    //on enlève notre explosion au bout de 300 ms, sinon elle serait tout le temps visible sur le terrain de jeu
    setTimeout(function () {
        gameBoard.removeChild(bomb);
    }, 300);
}

//fonction qui sert à créer une explosion
function createExplosion(bomb) {
    //changement de style
    bomb.classList.add("explosion");
    bomb.classList.remove("bomb");
    //léger décalage car je dois faire ça avec mon CSS pour avoir le résultat que je veux
    bomb.style.top = parseInt(bomb.style.top) - 50 + "px";
    bomb.style.left = parseInt(bomb.style.left) - 50 + "px";
    //on appelle la fonction pour voir si on touche un(des) ennemi(s)
    detectionExplosion(bomb);
}

//fonction qui sert à créer une bombe
function createBomb(top, left) {
    //on créé un élément HTML
    let bomb = document.createElement("div");
    bomb.setAttribute("class", "bomb");
    bomb.style.top = top + "px";
    bomb.style.left = left + "px";
    //on ajoute notre élément HTML comme enfant de la div qui représente notre terrain de jeu
    gameBoard.appendChild(bomb);

    //au bout de 3 secondes on appelle la function createExplosion
    setTimeout(function () {
        createExplosion(bomb);
    }, 3000);
}

//écouter le fait d'appuyer sur une touche
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        //flèche gauche
        case "ArrowLeft":
            move(player, "left");
            break;

        //flèche droite
        case "ArrowRight":
            move(player, "right")
            break;

        //flèche du haut
        case "ArrowUp":
            move(player, "up")
            break;

        //falèche du bas
        case "ArrowDown":
            move(player, "down")
            break;

        //touche espace
        case " ":
            createBomb(getComputedStyleInteger(player, "top"), getComputedStyleInteger(player, "left"))
            break;
    }
});

//faire bouger aléatoirement nos ennemis toutes les secondes
setInterval(function () {
    for (let i = 0; i < ennemies.length; i++) {
        let direction = directions[getRandomIntBetweenRange(3, 0)];
        move(ennemies[i], direction);
    }
}, 1000);



