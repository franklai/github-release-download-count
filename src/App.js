import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "franklai",
      repository: "synologylyric",
      items: []
    };
  }

  async handleClick() {
    const url = `https://api.github.com/repos/${this.state.account}/${this.state.repository}/releases`;
    const resp = await fetch(url);
    const json = await resp.json();

    const items = [];
    json.forEach((release) => {
      release.assets.forEach((asset) => {
        items.push({
          id: asset.id,
          name: asset.name,
          download_url: asset.browser_download_url,
          updated_at: asset.updated_at,
          download_count: asset.download_count
        });
      })
    });

    this.setState({ items: items });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const result = this.state.items.map(item => (
      <tr key={item.id}>
        <td>
          <a href={item.download_url}>{item.name}</a>
        </td>
        <td>{item.download_count}</td>
        <td>{item.updated_at}</td>
      </tr>
    ));

    return (
      <div className="App">
        <label>Account:</label>
        <input
          type="text"
          name="account"
          value={this.state.account}
          onChange={this.handleChange.bind(this)}
        ></input>
        <br />
        <label>Repository:</label>
        <input
          type="text"
          name="repository"
          value={this.state.repository}
          onChange={this.handleChange.bind(this)}
        ></input>
        <br />
        <button onClick={this.handleClick.bind(this)}>
          Show Download Count
        </button>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Download Count</th>
              <th>Last Updated</th>
            </tr>
            {result}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
