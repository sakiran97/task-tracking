
var Todo = React.createClass({displayName: "Todo",
    getInitialState: function(){
        return {editing: false} 
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable();
    },
    render: function() {
        if(this.state.editing){
            return this.renderEditCard();
        }else{
            return this.renderDefaultCard();
        }
    },

    renderDefaultCard: function() {
        return (
            React.createElement("div", {className: "todo"}, 
                React.createElement("h3", null, this.props.children), 
                React.createElement("button", {className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.edit}), 
                React.createElement("button", {className: "btn btn-warning glyphicon glyphicon-trash", onClick: this.delete})
            )
        )
    },
    renderEditCard: function() {
        return (
            React.createElement("div", {className: "todo"}, 
                React.createElement("textarea", {defaultValue: this.props.children, ref: "savedText"}), 
                React.createElement("button", {className: "btn btn-success  glyphicon glyphicon-floppy-disk", onClick: this.save})
            )
        )
    },
    edit: function(){
        console.log("Editing task");
        this.setState({editing: true});
    },
    delete: function(){
        console.log("Task Deleted")
        this.props.onDelete(this.props.index);
    },
    save: function() {
        console.log('Task saved');
        this.setState({editing: false});
        var txt = this.refs.savedText.getDOMNode().value;
        console.log('The saved text is ' + txt);
        this.props.onsave(this.refs.savedText.getDOMNode().value, this.props.index);
    },
});
document.body.style.backgroundImage = "url('img.png')"; 
     var ToDoList = React.createClass({displayName: "ToDoList",
        getInitialState: function(){
            return {
                tasks: [
                          'Task-1',
                          'Task-2',
                          'Task-3',
                          'Task-4'
                      ]

                 }
         },
        addToList: function(newText){
        var tasksArr = this.state.tasks;
        tasksArr.push(newText); 
        this.setState({tasks: tasksArr}); 
    },
        saveList: function(newText, i){
        var tasksArr = this.state.tasks;
        tasksArr[i] = newText; 
        this.setState({tasks: tasksArr}); 
    },
    deleteFromList: function(i){
        var tasksArr = this.state.tasks;
        tasksArr.splice(i, 1); 
        this.setState({tasks: tasksArr}); 
    },
        eachTask: function(task, i){
        return (
            React.createElement(Todo, {index: i, onsave: this.saveList, onDelete: this.deleteFromList}, task)
        );
    },
    render: function() {
        return (
            React.createElement("div", {className: "todo-list"}, 
                this.state.tasks.map(this.eachTask), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", onClick: 
this.addToList.bind(null, "New Task")})
                
            )
        ) /* The bind event is to pass default placeholder for the first time we add a task */
    }
});

React.render(React.createElement(ToDoList, {count: 10}), document.getElementById('react-component'));