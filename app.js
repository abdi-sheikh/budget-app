//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //holds all data used for the app
    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return { 
        addItem: function(type, des, val){
            var newItem, ID;
            //ID should equal last ID + 1
            //Creat new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
            

            //Create new item based on type
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }else if(type == 'inc'){
                newItem = new Income(ID,des,val);
            }
            //add to data structure
            data.allItems[type].push(newItem);
            //Return the new element
            return newItem;
            
        }
    };

})();


//UI CONTROLLER
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    return {
        getinput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function(obj,type){
            var html,newHtml,element;
            //create html string with place holder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
               
            //replace placeholder text with real data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //add real data to dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        clearFields: function(){
            var fields,fieldArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldArr = Array.prototype.slice.call(fields);

            fieldArr.forEach(function(current, index, array){
                current.value = "";
                //current.description = "";
            });

            fieldArr[0].focus();
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl,UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);


        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function(){

        //1. Calc the budget

        //2. Return the budget

        //3. Display the budget on the UI

    };

    var ctrlAddItem = function(){

        var input,newItem;
        // 1. Get field input data
        input = UICtrl.getinput();

        if(input.description !== "" && !isNaN(input.value) && input.value >0){
            //2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);
            //3. Add the item to UI
            UICtrl.addListItem(newItem,input.type);

            //3.5 clear fields
            UICtrl.clearFields();

            //4. calc and update budget
            updateBudget();
        }


    };

    return {
        init: function(){
            console.log('App started.');
            setupEventListeners();
        }
    }

})(budgetController,UIController);


controller.init();

