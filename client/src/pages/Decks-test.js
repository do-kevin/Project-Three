// Page one of the Flashcards section

import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

// Components
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

// CSS
import "../css/Decks.css";

class DecksTest extends React.Component {
  constructor(props) {
    super(props);

    this.refs.cardList;
  }

  componentDidMount() {
    // let flashcard = document.querySelectorAll(".flashcard");

    console.dir(this.refs.cardList);
    console.log(this.refs.cardList);
    let test = this.refs.cardList.getElementsByTagName("li").length;
    let lastCard = this.refs.cardList.getElementsByTagName("li").length - 1;
    console.log(test);
    console.log(`Last card position: ${lastCard}`);
    console.log(typeof this.refs.cardList)

    console.log("-=========")
    console.log(document.querySelectorAll(".flashcard"))
    console.log("-=========")

    document.querySelector(".previous-btn")
      .addEventListener("click", function() {
        console.log("hit");

        var prependList = function() {
          if (document.querySelector(".flashcard").classList.contains("activeNow")) {
            console.log("yerp");
            console.log(lastCard);
            var slicedCard = document.querySelectorAll(".flashcard")
            // slicedCard.slice(lastCard)
              // .classList.remove("activeNow"); 
            // this.refs.cardList.prepend(slicedCard);
            slicedCard = Array.from(slicedCard)
              .slice(lastCard);
            console.log(slicedCard);
            // console.log(typeof slicedCard);
          }
        };

        setTimeout(function() {
          prependList();
        }, 150);
      });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Search />

        <div className="deck">
          <a href="#" type="button" className="previous-btn">
            <i className="fas fa-angle-double-left" />
          </a>
          <ul className="card-list list-unstyled" ref="cardList">
            <li className="flashcard activeNow">
              <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                ref={r => (this.Flippy = r)}
                style={{ width: "400px", height: "200px" }}
              >
                <FrontSide style={{ backgroundColor: "#93bbde" }}>
                  Front: Question
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  Back: Answer
                </BackSide>
              </Flippy>
            </li>
            <li className="flashcard">
              <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                ref={r => (this.Flippy = r)}
                style={{ width: "400px", height: "200px" }}
              >
                <FrontSide style={{ backgroundColor: "#93bbde" }}>
                  Front: Question
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  Back: Answer
                </BackSide>
              </Flippy>
            </li>
            <li className="flashcard activeNow">
              <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                ref={r => (this.Flippy = r)}
                style={{ width: "400px", height: "200px" }}
              >
                <FrontSide style={{ backgroundColor: "#93bbde" }}>
                  Front: Question
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  Back: Answer
                </BackSide>
              </Flippy>
            </li>
          </ul>
          <a href="#" className="next-btn">
            <i className="fas fa-angle-double-right" />
          </a>
        </div>
      </div>
    );
  }
}

export default DecksTest;
