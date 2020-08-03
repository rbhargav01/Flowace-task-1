const alert1=require('alert-node')

const express = require('express');
const path = require('path');

const router = express.Router();

var indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('static'))
app.use(express.json());
app.use(express.urlencoded())

app.use('/', indexRouter);

app.post('/',(req, res) => {
    var n = req.body.n;
    var blocked = req.body.blocked;

    var ans=task1(n,blocked);
    
    res.redirect('/');
  });

function task1(n,blocked){
        
    var seating=[];
    //var n=document.getElementByID("n").value;
    var families=[]

    for(var i=0; i<n; i++){
    var row=[0,0,0,0,0,0,0,0,0,0]
    seating.push(row)
    families.push(2)
    }

    blocked=blocked.trim().split(" ");
    //var blocked=document.getElementByID("blocked").value.trim().split(" ");
    blocked.sort();

    for(var i=0; i<blocked.length; i++){
    var cur_col=blocked[i].toUpperCase().charCodeAt(0)-65;
    var cur_row=parseInt(blocked[i].charAt(1))-1;
    seating[cur_row][cur_col]=1;
    var BCDE=(seating[cur_row][1]==0 && seating[cur_row][2]==0 && seating[cur_row][3]==0 && seating[cur_row][4]==0);
    var DEFG=(seating[cur_row][6]==0 && seating[cur_row][5]==0 && seating[cur_row][3]==0 && seating[cur_row][4]==0);
    var FGHI=(seating[cur_row][5]==0 && seating[cur_row][6]==0 && seating[cur_row][7]==0 && seating[cur_row][8]==0);
    if((BCDE && FGHI)){
        families[cur_row]=2;
    }
    else if((BCDE || DEFG || FGHI)){
        families[cur_row]=1;
    }
    else{
        families[cur_row]=0;
    }
    }
    var ans=0;
    for(var i=0; i<families.length;i++){
    ans+=families[i];
    }
    alert1(ans+" Families can be allocated for the given seating arrangement");
    return ans;
}

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});