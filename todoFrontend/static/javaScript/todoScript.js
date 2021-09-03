    /*
        KEY COMPONENTS:
        "activeItem" = null until an edit button is clicked. Will contain object of item we war editing
        "list_snapshot" = Will contain previous state of list. Used for removing extra rows on list update

        PROCESS:
        1 - Fetch Data and build rows "buildList()"
        2 - Create Item on form submit
        3 - Edit Item click- Prefill form and change submit URL
        4 - Delete Item - send Item id to delete URL
        5 - Cross our completed  task - Event handle updated item

        NOTES:
        -- Add event handlers to "edit", "delete", "title"
        -- Render with strike through item completed
        -- Remove extra data on re-render
        -- CSRF Token
    */

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    let activeItem = null
    let list_snapshot = []

    buildList()

    function buildList(){
        let wrapper = document.getElementById('list-wrapper');
        //wrapper.innerHTML = ''

        const url = 'http://localhost:8000/toDo/task-list/'

        fetch(url).then(function (response){
            response.json().then(function (data) {
                console.log(data)

                const list = data

                var i = 0

                for ( i in list){

                   try {
                       document.getElementById(`data-row-${i}`).remove()
                   }catch (err){

                   }


                   let title = `<span class="title">${list[i].title}</span>`
                    if (list[i].completed === true){
                        title = `<strike class="title">${list[i].title}</strike>`
                    }



                    const item = `<div id = "data-row-${i}" class="task-wrapper flex-wrapper">
                            <div style="flex: 7">${title}</div>
                            <div style="flex: 1"><button class="btn btn-sm btn-outline-info edit">Edit</button></div>
                            <div style="flex: 1"><button class="btn btn-sm btn-outline-dark delete">-</button></div>
                            </div>`
                    wrapper.innerHTML += item


                }

                if (list_snapshot.length > list.length){
                        let j;
                        for (j = list.length; j < list_snapshot.length; j+=1){
                            document.getElementById(`data-row-${j}`).remove()
                        }
                    }

                list_snapshot = list


                for (let i in list){
                    const editBtn = document.getElementsByClassName('edit')[i]
                    const deleteBtn = document.getElementsByClassName('delete')[i]
                    const title = document.getElementsByClassName('title')[i]


                    editBtn.addEventListener('click', function () {
                        editItem(list[i])
                    })

                    deleteBtn.addEventListener('click', function () {
                        deleteItem(list[i])
                    })

                    title.addEventListener('click', function () {
                        strikeUnstrike(list[i])
                    })
                }
            })
        })

    }

    const form = document.getElementById('form-wrapper')
    form.addEventListener('submit',function (e) {
        e.preventDefault()
        console.log('form submitted')
        let url= 'http://localhost:8000/toDo/task-create/'

        if (activeItem != null){
            let url = 'http://localhost:8000/toDo/task-update/' + activeItem.id + '/'
            activeItem = null
        }

        const title = document.getElementById('title').value
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'title': title}),
        }).then(function (response){
            buildList()
            document.getElementById('form').reset()
        })
    })

    function editItem(item){
        console.log(item, ' edit button has been clicked')
        activeItem = item
        document.getElementById('title').value = activeItem.title
    }

    function deleteItem(item){
        console.log(item, 'delete clicked')
        const url = 'http://localhost:8000/toDo/task-delete/' + item.id + '/'
        fetch(url,{
            method:'DELETE',
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken':csrftoken,
            }
        }).then((response) =>{
            buildList()
        })
    }

    function strikeUnstrike(item){
        console.log(item,'strike clicked')
        item.completed = !item.completed
        const url = 'http://localhost:8000/toDo/task-update/' + item.id + '/'
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({
                'title':item.title,
                'completed': item.completed,
            })
        }).then((Response) =>{
            buildList()
        })

    }
