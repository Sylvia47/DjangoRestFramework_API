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

        //buildList()

        /*
        function buildList(){
            const wrapper = document.getElementById('list-wrapper');

            const url = 'http://127.0.0.1:8000/toDo/task-list/'

            fetch(url,{
                mode:"no-cors"
            })
            .then((resp) => resp.json())
            .then(function (data){
                console.log('Data',data)
            })

        }

        */
