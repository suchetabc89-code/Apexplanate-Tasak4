/* =====================================================
   TASK 4 - COMMON JAVASCRIPT
   Works with all 5 HTML pages
===================================================== */


/* =====================================================
   CONTACT FORM VALIDATION
   contact.html
===================================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value.trim();


            const email =
                document.getElementById("email")
                    .value.trim();


            const message =
                document.getElementById("message")
                    .value.trim();


            const nameError =
                document.getElementById("nameError");


            const emailError =
                document.getElementById("emailError");


            const messageError =
                document.getElementById("messageError");


            const successMessage =
                document.getElementById(
                    "successMessage"
                );


            /* Clear old messages */

            nameError.textContent = "";

            emailError.textContent = "";

            messageError.textContent = "";

            successMessage.textContent = "";


            let valid = true;


            /* NAME VALIDATION */

            if (name === "") {

                nameError.textContent =
                    "Name is required.";

                valid = false;

            }

            else if (name.length < 3) {

                nameError.textContent =
                    "Name must contain at least 3 characters.";

                valid = false;

            }


            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                emailError.textContent =
                    "Email is required.";

                valid = false;

            }

            else if (
                !emailPattern.test(email)
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            /* MESSAGE VALIDATION */

            if (message === "") {

                messageError.textContent =
                    "Message is required.";

                valid = false;

            }

            else if (message.length < 10) {

                messageError.textContent =
                    "Message must contain at least 10 characters.";

                valid = false;

            }


            /* SUCCESS */

            if (valid) {

                successMessage.textContent =
                    "Form submitted successfully!";

                contactForm.reset();

            }

        }
    );

}



/* =====================================================
   TO-DO LIST WITH LOCAL STORAGE
   todo.html
===================================================== */


const taskInput =
    document.getElementById("taskInput");


const addTaskButton =
    document.getElementById("addTask");


const taskList =
    document.getElementById("taskList");


const taskCount =
    document.getElementById("taskCount");


const clearTasks =
    document.getElementById("clearTasks");


const emptyMessage =
    document.getElementById("emptyMessage");



/*
    Only execute To-Do code when
    todo.html is open.
*/

if (
    taskInput &&
    addTaskButton &&
    taskList
) {


    /* Load saved tasks */

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "subhrangsuTasks"
            )
        ) || [];


    /* =================================================
       SAVE TASKS
    ================================================= */

    function saveTasks() {

        localStorage.setItem(
            "subhrangsuTasks",
            JSON.stringify(tasks)
        );

    }


    /* =================================================
       DISPLAY TASKS
    ================================================= */

    function displayTasks() {

        taskList.innerHTML = "";


        if (tasks.length === 0) {

            emptyMessage.style.display =
                "block";

        }

        else {

            emptyMessage.style.display =
                "none";

        }


        tasks.forEach(
            function (task) {


                const li =
                    document.createElement(
                        "li"
                    );


                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    task.text;


                text.className =
                    "task-text";


                if (task.completed) {

                    text.classList.add(
                        "completed"
                    );

                }


                /* Complete task */

                text.addEventListener(
                    "click",
                    function () {

                        task.completed =
                            !task.completed;

                        saveTasks();

                        displayTasks();

                    }
                );


                /* Delete button */

                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.textContent =
                    "Delete";


                deleteButton.className =
                    "task-delete";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        tasks =
                            tasks.filter(
                                function (item) {

                                    return (
                                        item.id !==
                                        task.id
                                    );

                                }
                            );


                        saveTasks();

                        displayTasks();

                    }
                );


                li.appendChild(text);

                li.appendChild(
                    deleteButton
                );

                taskList.appendChild(li);

            }
        );


        /* Task counter */

        taskCount.textContent =
            tasks.length +
            (
                tasks.length === 1
                    ? " task"
                    : " tasks"
            );

    }


    /* =================================================
       ADD TASK
    ================================================= */

    function addNewTask() {


        const text =
            taskInput.value.trim();


        if (text === "") {

            alert(
                "Please enter a task."
            );

            return;

        }


        const newTask = {

            id: Date.now(),

            text: text,

            completed: false

        };


        tasks.push(newTask);


        saveTasks();

        displayTasks();


        taskInput.value = "";

        taskInput.focus();

    }


    /* Add button */

    addTaskButton.addEventListener(
        "click",
        addNewTask
    );


    /* Enter key */

    taskInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                addNewTask();

            }

        }
    );


    /* =================================================
       CLEAR ALL
    ================================================= */

    clearTasks.addEventListener(
        "click",
        function () {


            if (tasks.length === 0) {

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to delete all tasks?"
                );


            if (confirmClear) {

                tasks = [];

                saveTasks();

                displayTasks();

            }

        }
    );


    /* Load tasks */

    displayTasks();

}



/* =====================================================
   PRODUCT LISTING
   products.html
===================================================== */


const productGrid =
    document.getElementById(
        "productGrid"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const priceFilter =
    document.getElementById(
        "priceFilter"
    );


const sortFilter =
    document.getElementById(
        "sortFilter"
    );


const resetFilter =
    document.getElementById(
        "resetFilter"
    );


const noProducts =
    document.getElementById(
        "noProducts"
    );



/*
    Only execute product code
    when products.html is open.
*/

if (
    productGrid &&
    categoryFilter &&
    priceFilter &&
    sortFilter
) {


    /* =================================================
       PRODUCT DATA
    ================================================= */

    const products = [

        {
            name: "Arduino UNO",
            category: "electronics",
            price: 650,
            rating: 4.5,
            icon: "🔌"
        },

        {
            name: "ESP32 Development Board",
            category: "electronics",
            price: 550,
            rating: 4.8,
            icon: "📡"
        },

        {
            name: "Servo Motor",
            category: "robotics",
            price: 350,
            rating: 4.4,
            icon: "⚙️"
        },

        {
            name: "Ultrasonic Sensor",
            category: "components",
            price: 180,
            rating: 4.2,
            icon: "📶"
        },

        {
            name: "PCA9685 Servo Driver",
            category: "robotics",
            price: 450,
            rating: 4.6,
            icon: "🔧"
        },

        {
            name: "Digital Multimeter",
            category: "tools",
            price: 850,
            rating: 4.7,
            icon: "📏"
        },

        {
            name: "Soldering Iron",
            category: "tools",
            price: 750,
            rating: 4.3,
            icon: "🔥"
        },

        {
            name: "OLED Display",
            category: "components",
            price: 400,
            rating: 4.5,
            icon: "🖥️"
        },

        {
            name: "DC Motor",
            category: "robotics",
            price: 250,
            rating: 4.1,
            icon: "🔄"
        },

        {
            name: "Jumper Wire Kit",
            category: "components",
            price: 200,
            rating: 4.4,
            icon: "🔗"
        },

        {
            name: "Bench Power Supply",
            category: "tools",
            price: 1800,
            rating: 4.8,
            icon: "🔋"
        },

        {
            name: "Temperature Sensor",
            category: "electronics",
            price: 150,
            rating: 4.0,
            icon: "🌡️"
        }

    ];



    /* =================================================
       DISPLAY PRODUCTS
    ================================================= */

    function displayProducts(
        productArray
    ) {


        productGrid.innerHTML = "";


        if (productArray.length === 0) {

            noProducts.style.display =
                "block";

            return;

        }


        noProducts.style.display =
            "none";


        productArray.forEach(
            function (product) {


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                card.innerHTML = `

                    <div class="product-icon">
                        ${product.icon}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <p class="product-price">
                        ₹${product.price}
                    </p>

                    <p class="product-rating">
                        ⭐ ${product.rating}
                    </p>

                    <button class="view-product">
                        View Product
                    </button>

                `;


                const viewButton =
                    card.querySelector(
                        ".view-product"
                    );


                viewButton.addEventListener(
                    "click",
                    function () {

                        alert(
                            "You selected: " +
                            product.name
                        );

                    }
                );


                productGrid.appendChild(
                    card
                );

            }
        );

    }



    /* =================================================
       FILTER + SORT
    ================================================= */

    function filterAndSortProducts() {


        let filteredProducts =
            [...products];


        /* CATEGORY */

        const category =
            categoryFilter.value;


        if (category !== "all") {

            filteredProducts =
                filteredProducts.filter(
                    function (product) {

                        return (
                            product.category ===
                            category
                        );

                    }
                );

        }


        /* PRICE */

        const maxPrice =
            priceFilter.value;


        if (maxPrice !== "all") {

            filteredProducts =
                filteredProducts.filter(
                    function (product) {

                        return (
                            product.price <=
                            Number(maxPrice)
                        );

                    }
                );

        }


        /* SORT */

        const sort =
            sortFilter.value;


        if (sort === "low") {

            filteredProducts.sort(
                function (a, b) {

                    return (
                        a.price -
                        b.price
                    );

                }
            );

        }


        else if (sort === "high") {

            filteredProducts.sort(
                function (a, b) {

                    return (
                        b.price -
                        a.price
                    );

                }
            );

        }


        else if (sort === "rating") {

            filteredProducts.sort(
                function (a, b) {

                    return (
                        b.rating -
                        a.rating
                    );

                }
            );

        }


        else if (sort === "name") {

            filteredProducts.sort(
                function (a, b) {

                    return a.name.localeCompare(
                        b.name
                    );

                }
            );

        }


        displayProducts(
            filteredProducts
        );

    }



    /* =================================================
       FILTER EVENTS
    ================================================= */

    categoryFilter.addEventListener(
        "change",
        filterAndSortProducts
    );


    priceFilter.addEventListener(
        "change",
        filterAndSortProducts
    );


    sortFilter.addEventListener(
        "change",
        filterAndSortProducts
    );



    /* =================================================
       RESET
    ================================================= */

    resetFilter.addEventListener(
        "click",
        function () {

            categoryFilter.value =
                "all";

            priceFilter.value =
                "all";

            sortFilter.value =
                "default";

            displayProducts(
                products
            );

        }
    );


    /* Initial display */

    displayProducts(
        products
    );

}