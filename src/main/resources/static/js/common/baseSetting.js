window.onload = function(){
    var arr = document.getElementsByTagName('a');
    for(var i = 0;i<arr.length;i++){
        arr[i].onclick = function(){
            if (this.id = 'Regulators' )
            {
                document.getElementById("box1").style.display = 'block' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'none' ;

            }
            else if(this.id = 'TerminalFactory')
            {
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'block' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'none' ;
            }
            else if(this.id = 'Substation'){
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'block' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'none' ;
            }
            else if(this.id = 'LineInfo'){
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'block' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'none' ;
            }
            else if(this.id = 'TowerInfo'){
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'block' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'none' ;
            }
            else if(this.id = 'TerminalInfo'){
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'block' ;
                document.getElementById("box7").style.display = 'none' ;
            }
            else if(this.id = 'UserInfo'){
                document.getElementById("box1").style.display = 'none' ;
                document.getElementById("box2").style.display = 'none' ;
                document.getElementById("box3").style.display = 'none' ;
                document.getElementById("box4").style.display = 'none' ;
                document.getElementById("box5").style.display = 'none' ;
                document.getElementById("box6").style.display = 'none' ;
                document.getElementById("box7").style.display = 'block' ;
            }
            //this是当前激活的按钮，在这里可以写对应的操作
            if(this.className = 'btn1'){
                this.className = 'btn2';
                var name = this.id;
                var btn = document.getElementsByClassName('btn2');
                for(var j=0;j<btn.length;j++){
                    if(btn[j].id!=name){
                        btn[j].className = 'btn1';
                    }
                }
            }
        }
    }
}