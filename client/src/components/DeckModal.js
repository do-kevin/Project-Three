import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class DeckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      deckTags: "",
      showTagsValidation: false,
      userId: JSON.parse(localStorage.getItem("user")).id
    };
  }

  // handleName & handleTags cannot read property of undefn.
  handleName = event => {
    this.setState({ deckName: event.target.value });
  };

  handleTags = event => {
    this.setState({ 
      deckTags: event.target.value
    });

    if (event.target.value === "") {
      this.setState({ showTagsValidation: true })
    } else {
      this.setState({ showTagsValidation: false })
    }
  };

  createTagsForDeck = () => {
    let arr = [];

    if (this.state.deckTags !== "") {
      axios
      .post("/decks/" + this.state.userId, { subject: this.state.deckName })
      .then(response => {
        // console.log(response);

        if (this.state.deckTags !== "") {
          arr = this.state.deckTags.trim().split(" ");

          arr.map(item => {
            let obj = {
              deckId: response.data.id,
              tags: item
            };

            axios.post("/tags", obj).then(response => {
              this.props.getDecks();
            });
          });
          this.props.toggle();
          // this.props.getDecks();
          this.setState({
            deckName: "",
            deckTags: ""
          });
        }
      });
    } else {
      this.setState({ showTagsValidation: true});
    }
  };

  componentDidMount() {
    var { openCreate } = this.props;

    this.setState({
      openCreate
    });
  }

  render() {
    // console.log(this.state.deckName)

    let displayTagValid;

    if (this.state.showTagsValidation === false) {
      displayTagValid = "";
    } else {
      displayTagValid = (<p style={{color: "red"}}>One minimum character required.</p>);
    }

    return (
      <div>
        <Modal
          isOpen={this.props.openCreate}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Create Deck</ModalHeader>
          <ModalBody style={{ margin: "0 2% 0 5%" }}>
            <Form>
              <FormGroup>
                <Label for="deckname">Deck Name:</Label>
                <Input
                  type="text"
                  name="deckname"
                  id="deckname"
                  value={this.state.deckName}
                  onChange={this.handleName}
                  maxLength="25"
                />
              </FormGroup>
              <FormGroup>
                <Label for="decktags">Tags:</Label>
                <Input
                  pattern=".{1,}"
                  required title="1 character minimum"
                  type="text"
                  name="decktags"
                  id="decktags"
                  value={this.state.deckTags}
                  onChange={this.handleTags}
                />
                {displayTagValid}
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              onClick={this.createTagsForDeck}
            >
              <i className="fas fa-save" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeckModal;
