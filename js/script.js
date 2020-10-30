document.body.style.background = "url('[img.png]')";
var Todo = React.createClass({
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
            <div className="todo">
                <h3>{this.props.children}</h3>
                <button className="btn btn-primary glyphicon glyphicon-pencil" onClick={this.edit}></button>
                <button className="btn btn-warning glyphicon glyphicon-trash" onClick={this.delete}></button>
            </div>
        )
    },
    renderEditCard: function() {
        return (
            <div className="todo">
                <textarea defaultValue={this.props.children} ref="savedText"></textarea>
                <button className="btn btn-success  glyphicon glyphicon-floppy-disk" onClick={this.save}></button>
            </div>
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
     var ToDoList = React.createClass({
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
            <Todo index={i} onsave={this.saveList} onDelete={this.deleteFromList}>{task}</Todo>
        );
    },
    render: function() {
        return (
            <div className="todo-list">
                {this.state.tasks.map(this.eachTask)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick=
                {this.addToList.bind(null, "New Task")}></button> 
                
            </div>
        ) /* The bind event is to pass default placeholder for the first time we add a task */
    }
});

React.render(<ToDoList count={10}></ToDoList>, document.getElementById('react-component'));