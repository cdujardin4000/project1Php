$(function(){

    const TARGETCURSUS = $('#cursus');
    const BUTTON = $('#btn_lire');
    const TARGETNOTES = $('#content');
    const TARGETTITLES = $('#courses');
    const TARGETSLIDER = $('.sliderTarget');
    //fonction qui arrondi a n decimales avec prototype de Math
    Math.arrondi = function(nombre, dec){
        let result = Math.trunc(nombre * Math.pow(10, dec) + 0.5);
        result /= Math.pow(10, dec);

        return result;
    } 

    //Template objet student créé avec une fonction
    function Student(name, firstname, email){

        this.name = name.toLowerCase();
        this.firstname = firstname.toUpperCase();
        this.email = email;
        this.cursus = {};
        this.middle = {};
        this.remainingAbsence = 10;
    }

    // methodes de l'objet Student avec fonction
    Student.prototype = {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////FONCTIONS DIRECTES///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        AddCursus : function(nameCursus){
            
            nameCursus = nameCursus.toLowerCase();
            if (this.cursus[nameCursus] === undefined){
                this.cursus[nameCursus] = [];
                console.log(`L'étudiant ${this.firstname} ${this.name} s'est inscrit au cours de  ${nameCursus}`);
            }
            else {
                console.log(`L'étudiant ${this.firstname} ${this.name} suis déja le cours de ${nameCursus}`);
            }
            return this.cursus;
        },

        InjustifiedAbsence : function(days){

            this.remainingAbsence -= days;
            return this.RemainingAbsence();
        },

        AddPoints : function(nameCursus, points){    
            nameCursus = nameCursus.toLowerCase();
            this.cursus[nameCursus].push(points);      
        },

        CalculateAverageCursus : function(nameCursus){
            nameCursus = nameCursus.toLowerCase();
            let totalCursus = 0;
            let nbrTests = 0;
            let middleCursus;

            for (let i = 0; i < this.cursus[nameCursus].length; i++){
                totalCursus += this.cursus[nameCursus][i];
                nbrTests ++;
            }

            middleCursus = Math.arrondi((totalCursus / nbrTests), 1);

            console.log(`L'étudiant ${this.firstname} ${this.name} à obtenu la moyenne de ${middleCursus} au cours de ${nameCursus}`); 
            this.middle[nameCursus] = middleCursus;
            return middleCursus;        
        },

        CalculateAverageTotal : function(){
            let middleTotal = 0;
            let sum = 0;
            let amountCursus = 0;

            for (let nameCursus in this.cursus){
                sum = sum + this.CalculateAverageCursus(nameCursus);
                amountCursus ++;
            }

            middleTotal = Math.arrondi((sum / amountCursus), 1);
            console.log(`La moyenne TOTALE de l'étudiant est de ${middleTotal}`); 
        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////FONCTIONS SIMULATION///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        SimulateCursusChoice : function(){
            let courses = ["js", "php", "c", "c++", "c#", "html", "css", "java", "ruby", "brainfuck", "python", "mysql", "react", "vuejs", 
                           "angular", "symphony", "bb-code"];
            let amountCourses;

            do {
                amountCourses = Math.arrondi((Math.random() * courses.length), 0);
            }
            while (amountCourses < 1);

            for (let i = 1; i <= amountCourses; i++) {
                this.AddCursus(courses[Math.arrondi((Math.random() * courses.length - 1), 0)]);  
            }   
            
        },

        RemainingAbsence : function() {
            if (this.remainingAbsence >= 0){
                console.log(`L'étudiant ${this.firstname} ${this.name} peut encore s'absenter ${this.remainingAbsence} fois.`);
            }
        },

        SimulateAbsence : function() {
            let daysAway = Math.arrondi((Math.random()*15), 0);
            for (let i = 0; i < daysAway; i++) {
                this.InjustifiedAbsence(1);           
            }       
        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////FONCTIONS TIMER DOM///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        CreateHtmlTimeOutFor : function () {
            let sizeFor = Object.keys(this.cursus).length;
            console.log('size for', sizeFor);
            
            for (let i = 1; i <= sizeFor; i++){

                this.CreateHtmlTimeOut(i * 1000, "cursus"); 
                console.log(i); 

            }    
        },

        CreateTableTimeout : function () {
            let timeoutTable = Object.keys(this.cursus).length * 1000;
            return new Promise(resolve => {
                setTimeout(() => {

                        resolve(this.ResolveHtmlTable());
                 

                }, timeoutTable);
            });    
        },

        CreateHtmlTimeOut : function (AmountMs, target) {
            console.log('wait for it');
            let ms = AmountMs;
            return new Promise(resolve => {
                setTimeout(() => {
                    if (target === "cursus"){
                        resolve(this.ResolveHtmlCursus(ms/1000));
                    }
                    else if (target === "for"){
                        resolve(this.CreateHtmlTimeOutFor())
                    }
                    else if (target === "table"){
                        resolve(this.CreateTableTimeout());
                    }

                }, ms);
            });    
        },
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////FONCTIONS CREATE DOM///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        ResolveHtmlCursus : function(index) {
            
            let titles = [];
            
            for (let course in this.cursus)  {
                titles.push(`${course}`);
                
            }
            console.log('timeout finish for');
            let i = index;
            let p = document.createElement('p');
            p.innerHTML = `L'étudiant  s'est inscrit au cours de  ${titles[i -1]}`
            TARGETCURSUS.append(p);
            console.log(`cursus ${i}`);
        },

        ResolveHtmlTable : function () {
            
            console.log('timeout finish');
            console.log(this.cursus);

            let size = Object.keys(this.cursus).length;
            console.log('size ', size);
            let titles = [];
            
            for (let course in this.cursus)  {
                titles.push(`${course}`);
                
            }

            let trH = document.createElement('tr');
            let tdH = document.createElement('th');
            tdH.innerHTML = "COURS";
            trH.append(tdH);

            for (let h = 0; h <= this.cursus[titles[0]].length -1; h++) {
                let thT = document.createElement('th');
                thT.innerHTML = `TEST ${h +1}`;
                trH.append(thT);

            }

            let tdHF = document.createElement('th');
            tdHF.innerHTML = "TOTAL";
            trH.append(tdHF);
            TARGETTITLES.append(trH);
            TARGETTITLES.css({"textAlign": 'center',"color": 'blue'});
            
            
            for (let c = 0; c < size; c++) {
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.append(`${titles[c]}`);
                tr.append(th);
                let tdM = document.createElement('td');
                tdM.append(`TOTAL`)
                for (let t = 0; t < (this.cursus[titles[c]].length); t++) {
                    let td = document.createElement('td');
                    td.append(`${this.cursus[titles[c]][t]}`);
                    tr.append(td);
                    
                }
                let tdF = document.createElement('td');
                if (this.middle[titles[c]] == undefined) {
                    tdF.append(`trop d'absences: 0`);
                }
                else {
                    tdF.append(`${this.middle[titles[c]]}`);
                }
                
                $(tdF).css("border", '2px solid');
                tr.append(tdF);
 
                TARGETNOTES.append(tr);
                TARGETNOTES.css({"textAlign": 'center'})    
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////FONCTIONS JEU DE TEST///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        SchoolYear : function(){
            // Jeu de test Simulation d'une année scolaire en utilisants les methodes précédentes
            let amountTests; 
            let score;
            let luckyNumber;

            this.SimulateCursusChoice();

            this.SimulateAbsence();

            if (this.remainingAbsence < 0){
                console.log("L'élève à trop d'absences injustifiées, il ne peux pas passer ses examens.");
            }
            else{
                do {
                    luckyNumber = Math.arrondi((Math.random()*10), 0);
                }
                while (luckyNumber < 1);
                do {
                    amountTests = Math.arrondi((Math.random()*10), 0);
                }
                while (amountTests < 1);

                for (let nameCursus in this.cursus){  

                    for(let i = 1; i <= amountTests; i++){

                        this.cursus[nameCursus].luckyTab = [];

                        for (let j = 1; j <= luckyNumber; j++) {
                            this.cursus[nameCursus].luckyTab.push(Math.arrondi((Math.random()*100), 1));                       
                        }
                        score = this.cursus[nameCursus].luckyTab[0];

                        for (let k = 0; k < this.cursus[nameCursus].luckyTab.length; k++) {
                            if (this.cursus[nameCursus].luckyTab[k] > score){
                                score = this.cursus[nameCursus].luckyTab[k];
                            }                       
                        }

                        this.AddPoints(nameCursus, score);
                    }
                }
                this.CalculateAverageTotal();
                                     
            }
            this.CreateHtmlTimeOut(1000, "for"); 

              
            this.CreateHtmlTimeOut(3000, "table"); 
        },


    }


    
    SimulateSchoolYear = function(){
        //jeu de test: fonction qui crée un objet student et lui génère une adresse mail
        let name;
        let firstname;
        let email;
        const INSCRIPTION = $('#inscription');
        names = ["tatiana", "fatiha", "stephane", "myriam", "aliou", "cedric", "pierre-yves", "pierre", "nicolas", "loic", "angelique", "martin", 
                "benoit", "alain", "prime", "dominika", "charlotte", "ahmed", "sylviana", "mickael"];    
        firstnames = ["adamich", "barkani", "cardillo", "delvenne", "diallo", "dujardin", "flamand", "gabriel", "gihoul", "hubermont", "krause", 
                     "lechene", "mayeur", "niessen", "nizer", "raciborska", "rambeaux", "soleiman", "vanmessen", "vanstraelen", "kovacs"];
        name = names[Math.arrondi((Math.random()*names.length-1), 0)];
        firstname = firstnames[Math.arrondi((Math.random()*firstnames.length-1), 0)];
        email = `${firstname.toLowerCase()}${name[0]}@isl-edu.be`;
        let monEtudiant = new Student(`${name}`, `${firstname}`, `${email}`);

        ResolveHtmlInscription = function () {
            let p = document.createElement('p');
            p.innerHTML = `L'étudiant ${name} ${firstname} s'est bien inscrit à l'Institut Saint-Laurent pour l'année 
            académique 2038-2039, son email de contact est ${email}`
            INSCRIPTION.append(p);
            INSCRIPTION.css('font-size', '1.5rem');
        }

        ResolveHtmlInscription();
        console.log(`L'étudiant ${name} ${firstname} s'est bien inscrit à l'Institut Saint-Laurent pour l'année académique 2038-2039, son 
                    email de contact est ${email}`);

        monEtudiant.SchoolYear();
        
    }

    

    $(BUTTON).on('click', (e) => {
        e.preventDefault();
        SimulateSchoolYear();
        
        $(BUTTON).hide();
    })






})



