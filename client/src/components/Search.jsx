import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import WithRouter, { withRouter } from "react-router-dom";
import "../CSS/style.css";
import async from "react-select/lib/Async";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      search_options: [],
      option: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ option: nextProps.history.location.search });
  }

  handleInputChange = (newValue) => {
    console.log("new_value" + newValue);
    const inputValue = newValue;
    this.setState({ inputValue });
    return inputValue;
  };

  Change_route = (selectedOption) => {
    this.setState(
      {
        option: selectedOption.value,
      },
      () => {
        this.props.history.push("/search?q=" + this.state.option);
      }
    );
    // this.props.history.push("/search?q=" + selectedOption.value);
  };

  loadOptions = (inputValue, callback) => {
    // console.log(inputValue);
    const response = fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${inputValue}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "b96c22506118490a8b6ed375f0899d79",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const resultsRaw = data.suggestionGroups[0].searchSuggestions;
        // console.log(resultsRaw);
        let results = resultsRaw.map((result) => {
          return {
            label: result.displayText,
            value: result.displayText,
          };
        });
        // console.log(resultsRaw);
        const current = { label: inputValue, value: inputValue };
        results.unshift(current);
        // console.log(this.state.search_options);
        callback(results);
      });
  };

  render() {
    // console.log(this.props.history)
    if (this.props.history.location.pathname == "/search") {
      return (
        <div>
          <AsyncSelect
            className="search_box"
            placeholder="Enter Keyword.."
            loadOptions={this.loadOptions}
            onInputChange={this.handleInputChange}
            onChange={this.Change_route}
          />
        </div>
      );
    } else {
      return (
        <div>
          <AsyncSelect
            className="search_box"
            placeholder="Enter Keyword.."
            loadOptions={this.loadOptions}
            onInputChange={this.handleInputChange}
            onChange={this.Change_route}
            value={null}
          />
        </div>
      );
    }
  }
}

export default withRouter(Search);
