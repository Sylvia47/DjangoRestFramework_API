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

        buildList()

        function buildList(){
            var wrapper = document.getElementById('list-wrapper');
            wrapper.innerHTML = ''

            var url = 'http://localhost:8000/toDo/task-list/'

            fetch(url).then(function (response){
                response.json().then(function (data) {
                    console.log(data)

                    var list = data
                    for(var i in list){
                        var item ='<div id = "data-row-${1}" class="task-wrapper flex-wrapper">' +
                                '<div style="flex: 7">' +
                                '<span class="title">' +
                                list[i].title +
                                '</span>' +
                                '</div>'+
                                '<div style="flex: 1">' +
                                '<button class="btn btn-sm btn-outline-info edit">Edit</button> ' +
                                '</div>'+
                                '<div style="flex: 1">' +
                                '<button class="btn btn-sm btn-outline-dark delete">-</button>' +
                                '</div>'+
                            '</div>'
                        wrapper.innerHTML += item
                    }
                });
            })

        }

        var form = document.getElementById('form-wrapper')
        form.addEventListener('submit',function (e) {
            e.preventDefault()
            console.log('form submitted')
            var url= 'http://localhost:8000/toDo/task-create/'
            var title = document.getElementById('title').value
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'X-CSRFToken':csrftoken,
                },
                body:JSON.stringify({'title': title}),
            }).then(function (response){
                buildList()
            })
        })
