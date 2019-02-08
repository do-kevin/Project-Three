import React from "react";
import { Link } from "react-router-dom"
import {
    Card, CardBody, CardTitle, CardImg, CardText, CardDeck, Jumbotron, Container, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import moment from "moment";
import axios from "axios";
import styled from 'styled-components';

import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar";

import "../css/Profile.css";

const Menu = styled.menu`
  #sidebar {
    top: 0;
  }
  .sidebar-nav__link--profile {
    background: white;
    box-shadow: 0px 2px 1px #888, 0px -2px 1px #888;
  }
  .sidebar-nav__link--profile .sidebar-nav__text {
    color: black;
  }
`;

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time_date: moment().format("ddd, MMMM Do YYYY, h:mm:ss a"),
            reminders: [],
            todos: [],
            decks: [],
            notes: []
        };
        this.getReminders = this.getReminders.bind(this);
        this.getToDos = this.getToDos.bind(this);
        this.getDecks = this.getDecks.bind(this);
        this.getNotes = this.getNotes.bind(this);
    };

    componentDidMount() {
        // console.log("Profile component mounted.");
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            if (userId) this.setState(() => ({ id: userId }));
        } catch (err) {
            console.log(err.message);
        }
        this.getReminders();
        this.getToDos();
        this.getDecks();
        this.getNotes();
    };

    deckIdSessionStorage = (id) => {
        sessionStorage.setItem("deckId", id);
    }

    // Request data from the database; obtain user id from localStorage

    getReminders = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/reminders/users/" + id)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    reminders: res.data
                });
            });
    };

    getToDos = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/todos/users/" + id)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    todos: res.data
                });
            });
    };

    getDecks = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/decks/users/" + id)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    decks: res.data
                });
            });
    };

    getNotes = () => {
        let id = JSON.parse(localStorage.getItem("user")).id;
        axios.get("/notes/users/" + id)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    notes: res.data
                });
            });
    };

    // Render page

    render() {

        let renderToDos;
        let renderReminders;
        let renderDecks;
        let renderNotes;

        // -------------- Render Reminders -------------- 
        if (this.state.reminders.length > 0) {
            renderReminders = (
                <ListGroup className="rem_todo_scroll">
                    <div>
                        {this.state.reminders.map((reminder) => {
                            var date = moment(reminder.date).format("ddd, MMMM Do YYYY, h:mm:ss a");
                            return (
                                <ListGroupItem className="small_font animated flipInX" key={reminder.id}>
                                    <span style={{ color: "#17A2B8" }}>{date}</span>
                                    <br />
                                    {reminder.item}
                                    <br />
                                    {reminder.note}
                                </ListGroupItem>
                            );
                        })}
                    </div>
                </ListGroup>
            )
        }
        else {
            renderReminders = (
                <ListGroup className="rem_todo_scroll animated flipInX">
                    <ListGroupItem className="small_font centerText animated fadeIn">No important dates.</ListGroupItem>
                </ListGroup>
            )
        }

        // -------------- Render To-Do List -------------- 
        if (this.state.todos.length > 0) {
            renderToDos = (
                <ListGroup className="rem_todo_scroll">
                    <div>
                        {this.state.todos.map((todo) => {
                            return (
                                <ListGroupItem className="small_font animated flipInX" key={todo.id}>{todo.item}</ListGroupItem>
                            );
                        })}
                    </div>
                </ListGroup>
            )
        }
        else {
            renderToDos = (
                <ListGroup className="rem_todo_scroll">
                    <ListGroupItem className="small_font centerText animated flipInX">All tasks completed.</ListGroupItem>
                </ListGroup >
            )
        }

        // -------------- Render Decks -------------- 
        if (this.state.decks.length > 1) {
            renderDecks = (
                <div>
                    <CardDeck className="deck_scroll">
                        {this.state.decks.slice(0, 4).map((deck) => {
                            return (
                                <Col key={deck.id} xs="12" sm="6" md="4" lg="3" >
                                    <Link to="/deck" onClick={() => this.deckIdSessionStorage(deck.id)}>
                                        <Card className="hover-deck animated pulse">
                                                <CardImg top src={require("../img/flashcards.jpg")} alt="Card image cap" />
                                            
                                            <CardBody>
                                                    <CardText className="small_font">{deck.subject}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                            );
                        })}
                    </CardDeck>
                </div>
            )
        }
        else if (this.state.decks.length === 1) {
            renderDecks = (
                <div className="oneNote">
                    {this.state.decks.map((deck) => {
                        return (
                            <Col key={deck.id} xs="12" sm="6" md="4" lg="3">
                                <Card>
                                    <Link to="/deck" onClick={() => this.deckIdSessionStorage(deck.id)}>
                                        <CardImg top width="100%" 
                                        src={require("../img/flashcards.jpg")}alt="Card image cap" />
                                    </Link>
                                    <CardBody>
                                        <Link to="/deck" onClick={() => this.deckIdSessionStorage(deck.id)}>
                                            <p className="small_font">{deck.subject}</p>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </div>
            )
        }
        else {
            renderDecks = (
                <Col>
                    <ListGroup>
                        <ListGroupItem className="small_font noDisplay">No decks to display.</ListGroupItem>
                    </ListGroup>
                </Col>
            )
        }

        // -------------- Render Notes -------------- 
        if (this.state.notes.length > 1) {
            renderNotes = (
                <div className="note_scroll notediv">
                    {this.state.notes.slice(0, 5).map((note) => {
                        return (
                            <Card key={note.id} className="animated zoomInRight note-output">
                                <CardBody>
                                    <div className="quill-output small_font" dangerouslySetInnerHTML={{ __html: note.note }} style={{ wordBreak: "break-word" }}></div>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            )
        }
        else if (this.state.notes.length === 1) {
            renderNotes = (
                <div>
                    {this.state.notes.map((note) => {
                        return (
                            <Card key={note.id} className="animated zoomInRight note-output">
                                <CardBody>
                                    <div className="quill-output" dangerouslySetInnerHTML={{ __html: note.note }} style={{ wordBreak: "break-word" }}></div>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            )
        }
        else {
            renderNotes = (
                <Col>
                    <ListGroup>
                        <ListGroupItem className="small_font noDisplay">No notes to display.</ListGroupItem>
                    </ListGroup>
                </Col>
            )
        }

        return (
            <div>
                {/* Logout redirection */}
                {this.props.handleUserRedirect()}

                <Menu><Sidebar handleUserLogout={this.props.handleUserLogout} /></Menu>
                <Container className="text-center">
                    <Row>
                        <Col>
                            <Jumbotron className="profile animated fadeIn">
                                <Container>
                                    <h1 className="display-4">Hello, <span id="username">{JSON.parse(localStorage.getItem("user")).name}</span>!</h1>
                                    <br />
                                    <Quote />
                                    <hr className="my-2" />
                                    {this.state.time_date}
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row
                        id="reminder-todo-row">
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Important Dates</CardTitle>
                                    <div className="card-text">
                                        {/************** Display existing reminders ****************/}
                                        {renderReminders}
                                    </div>
                                    <Link to="/reminder">
                                        <Button outline color="info" id="reminder">See More</Button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>To-do</CardTitle>
                                    <div className="card-text">
                                        {/************** Display existing to-dos ****************/}
                                        {renderToDos}
                                    </div>
                                    <Link to="/todo">
                                        <Button outline color="info" id="todo">See More</Button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="group">
                                <CardTitle>Recent Decks</CardTitle>
                                <Row>
                                    {/************** Display existing decks ****************/}
                                    {renderDecks}
                                </Row>                           
                                <Link to="/choose">
                                    <Button outline color="info" id="seeall">View All</Button>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="group notes">
                                <CardTitle>Recent Notes</CardTitle>
                                <Row id="notes-display">
                                    {/************** Display existing decks ****************/}
                                    {renderNotes}
                                </Row>
                                <Link to="/notes">
                                    <Button outline color="info" id="seeall">View All</Button>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                </Container >
            </div >
        );
    }
}

export default Profile;
