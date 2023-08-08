const gameboard = document.querySelector("#gameboard")
const playerdisplay = document.querySelector("#player")
const infodisplay = document.querySelector("#info-display")
const width = 8
let playergo='black'
playerdisplay.textContent = 'black'

const startpieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',  
    '', '', '', '', '', '', '', '',  
    '', '', '', '', '', '', '', '',  
    '', '', '', '', '', '', '', '',  
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createboard(){
    startpieces.forEach((startpiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startpiece
        square.firstChild && square.firstChild.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        
        const row = Math.floor((63-i)/8) + 1
        if(row%2 === 0){
            square.classList.add(i%2===0 ? "beige" : "brown")
        }else{
            square.classList.add(i%2===0 ? "brown" : "beige")
        }

        if(i<=15){
            square.firstChild.firstChild.classList.add('black')
        }

        if(i>=48){
            square.firstChild.firstChild.classList.add('white')
        }

        gameboard.append(square)
    })
}

createboard()


const allsquares = document.querySelectorAll(".square")

allsquares.forEach(square =>{
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startpositionid
let draggedelement

function dragStart(e){
    startpositionid = e.target.parentNode.getAttribute('square-id')
    draggedelement = e.target
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()
    const correctgo = draggedelement.firstChild.classList.contains(playergo)
    const taken = e.target.classList.contains('piece')
    const valid = checkifvalid(e.target)
    const opponentgo= playergo === 'white' ? 'black' : 'white'
    const takenbyopponent = e.target.firstChild?.classList.contains(opponentgo)
    
    if(correctgo){
        // must check this first
        if(takenbyopponent && valid){
            e.target.parentNode.append(draggedelement)
            e.target.remove()
            checkforwin()
            changeplayer()
            return
        }
        // then check this
        if(taken && !takenbyopponent){
            infodisplay.textContent = "you cannot go here!"
            setTimeout(() => infodisplay.textContent, 2000);
            return
        }
        if(valid){
            e.target.append(draggedelement)
            checkforwin()
            changeplayer()
            return
        }
    }
    
}

function checkifvalid(target){
    const targetid = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startid = Number(startpositionid)
    const piece = draggedelement.id
    console.log(targetid)

    switch(piece){
        case 'pawn' :
            const starterrow=[8,9,10,11,12,13,14,15]
            if(starterrow.includes(startid) && startid+width*2 === targetid ||
                startid+width === targetid ||
                startid+width-1 === targetid && document.querySelector(`[square-id="${startid+width-1}"]`).firstChild ||
                startid+width+1 === targetid && document.querySelector(`[square-id="${startid+width+1}"]`).firstChild
                ){
                return true
            }
            break;

        case 'knight' :
            if(startid+width*2+1 === targetid ||
                startid+width*2-1 === targetid ||
                startid+width-2 === targetid ||
                startid+width+2 === targetid ||
                startid-width*2+1 === targetid ||
                startid-width*2-1 === targetid ||
                startid-width-2 === targetid ||
                startid-width+2 === targetid ){
                    return true
                }
            break;
        
        case 'bishop' :
            if(startid+width+1 === targetid ||
                startid+width*2+2 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) ||
                startid+width*3+3 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) ||
                startid+width*4+4 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) ||
                startid+width*5+5 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) ||
                startid+width*6+6 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5+5}"]`).firstChild) ||
                startid+width*7+7 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6+6}"]`).firstChild) ||
                //--
                startid-width-1 === targetid ||
                startid-width*2-2 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) ||
                startid-width*3-3 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) ||
                startid-width*4-4 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) ||
                startid-width*5-5 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) ||
                startid-width*6-6 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5-5}"]`).firstChild) ||
                startid-width*7-7 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6-6}"]`).firstChild) ||
                //--
                startid-width+1 === targetid ||
                startid-width*2+2 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) ||
                startid-width*3+3 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) ||
                startid-width*4+4 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) ||
                startid-width*5+5 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) ||
                startid-width*6+6 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5+5}"]`).firstChild) ||
                startid-width*7+7 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6+6}"]`).firstChild) ||
                //--
                startid+width-1 === targetid ||
                startid+width*2-2 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) ||
                startid+width*3-3 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) ||
                startid+width*4-4 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) ||
                startid+width*5-5 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) ||
                startid+width*6-6 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5-5}"]`).firstChild) ||
                startid+width*7-7 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6-6}"]`).firstChild)
                ){
                    return true
                }
                break;
        
        case 'rook' :
            if(
                startid+width === targetid ||
                startid+width*2 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) ||
                startid+width*3 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) ||
                startid+width*4 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) ||
                startid+width*5 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) ||
                startid+width*6 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5}"]`).firstChild) ||
                startid+width*7 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6}"]`).firstChild) ||
                //--
                startid-width === targetid ||
                startid-width*2 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) ||
                startid-width*3 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) ||
                startid-width*4 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) ||
                startid-width*5 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) ||
                startid-width*6 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5}"]`).firstChild) ||
                startid-width*7 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6}"]`).firstChild) ||
                //--
                startid+1 === targetid ||
                startid+2 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) ||
                startid+3 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) ||
                startid+4 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) ||
                startid+5 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) ||
                startid+6 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+5}"]`).firstChild) ||
                startid+7 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+6}"]`).firstChild) ||
                //--
                startid-1 === targetid ||
                startid-2 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) ||
                startid-3 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) ||
                startid-4 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) ||
                startid-5 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) ||
                startid-6 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-5}"]`).firstChild) ||
                startid-7 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-6}"]`).firstChild)
            ){
                return true
            }
            break;

        case 'queen':
            if(
                startid+width+1 === targetid ||
                startid+width*2+2 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) ||
                startid+width*3+3 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) ||
                startid+width*4+4 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) ||
                startid+width*5+5 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) ||
                startid+width*6+6 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5+5}"]`).firstChild) ||
                startid+width*7+7 === targetid && !document.querySelector((`[square-id="${startid+width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6+6}"]`).firstChild) ||
                //--
                startid-width-1 === targetid ||
                startid-width*2-2 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) ||
                startid-width*3-3 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) ||
                startid-width*4-4 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) ||
                startid-width*5-5 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) ||
                startid-width*6-6 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5-5}"]`).firstChild) ||
                startid-width*7-7 === targetid && !document.querySelector((`[square-id="${startid-width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6-6}"]`).firstChild) ||
                //--
                startid-width+1 === targetid ||
                startid-width*2+2 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) ||
                startid-width*3+3 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) ||
                startid-width*4+4 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) ||
                startid-width*5+5 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) ||
                startid-width*6+6 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5+5}"]`).firstChild) ||
                startid-width*7+7 === targetid && !document.querySelector((`[square-id="${startid-width+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6+6}"]`).firstChild) ||
                //--
                startid+width-1 === targetid ||
                startid+width*2-2 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) ||
                startid+width*3-3 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) ||
                startid+width*4-4 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) ||
                startid+width*5-5 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) ||
                startid+width*6-6 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5-5}"]`).firstChild) ||
                startid+width*7-7 === targetid && !document.querySelector((`[square-id="${startid+width-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6-6}"]`).firstChild) ||
                //--
                startid+width === targetid ||
                startid+width*2 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) ||
                startid+width*3 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) ||
                startid+width*4 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) ||
                startid+width*5 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) ||
                startid+width*6 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5}"]`).firstChild) ||
                startid+width*7 ===targetid && !document.querySelector((`[square-id="${startid+width}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+width*6}"]`).firstChild) ||
                //--
                startid-width === targetid ||
                startid-width*2 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) ||
                startid-width*3 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) ||
                startid-width*4 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) ||
                startid-width*5 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) ||
                startid-width*6 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5}"]`).firstChild) ||
                startid-width*7 ===targetid && !document.querySelector((`[square-id="${startid-width}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-width*6}"]`).firstChild) ||
                //--
                startid+1 === targetid ||
                startid+2 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) ||
                startid+3 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) ||
                startid+4 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) ||
                startid+5 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) ||
                startid+6 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+5}"]`).firstChild) ||
                startid+7 ===targetid && !document.querySelector((`[square-id="${startid+1}"]`).firstChild) && !document.querySelector((`[square-id="${startid+2}"]`).firstChild) && !document.querySelector((`[square-id="${startid+3}"]`).firstChild) && !document.querySelector((`[square-id="${startid+4}"]`).firstChild) && !document.querySelector((`[square-id="${startid+5}"]`).firstChild) && !document.querySelector((`[square-id="${startid+6}"]`).firstChild) ||
                //--
                startid-1 === targetid ||
                startid-2 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) ||
                startid-3 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) ||
                startid-4 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) ||
                startid-5 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) ||
                startid-6 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-5}"]`).firstChild) ||
                startid-7 ===targetid && !document.querySelector((`[square-id="${startid-1}"]`).firstChild) && !document.querySelector((`[square-id="${startid-2}"]`).firstChild) && !document.querySelector((`[square-id="${startid-3}"]`).firstChild) && !document.querySelector((`[square-id="${startid-4}"]`).firstChild) && !document.querySelector((`[square-id="${startid-5}"]`).firstChild) && !document.querySelector((`[square-id="${startid-6}"]`).firstChild)
            ){
                return true
            }
            break;

        case 'king':
            if(
                startid+1 === targetid ||
                startid-1 === targetid ||
                startid+width === targetid ||
                startid-width === targetid ||
                startid+width+1 === targetid ||
                startid+width-1 === targetid ||
                startid-width+1 === targetid ||
                startid-width-1 === targetid
            ){
                return true
            }

    }
}


function changeplayer(){
    if(playergo === "black"){
        reverseids()
        playergo="white"
        playerdisplay.textContent = "white"
    }else{
        revertids()
        playergo="black"
        playerdisplay.textContent = "black"
    }
}

function reverseids(){
    const allsquares = document.querySelectorAll(".square")
    allsquares.forEach((square, i) => square.setAttribute('square-id', (width*width-1)-i))
}

function revertids(){
    const allsquares = document.querySelectorAll(".square")
    allsquares.forEach((square, i) => square.setAttribute('square-id', i))
}

function checkforwin(){
    const kings = Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king => king.firstChild.classList.contains('white'))){
        infodisplay.innerHTML = "Black player wins!"
        const allsquares = document.querySelectorAll('.square')
        allsquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }
    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        infodisplay.innerHTML = "White player wins!"
        const allsquares = document.querySelectorAll('.square')
        allsquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }
}







