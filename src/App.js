
import React, { Component } from 'react';
import Histogram from 'react-chart-histogram'


function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/)
    var freqMap = {}
    var totalwords = 0, totaldistinctwords = 0
    words.forEach(function (w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });
    delete freqMap['']
    var sorted = {}
    sorted = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a])
    console.log(sorted)
    var labels = [], data = []
    sorted.forEach(function (w) {
        if (labels.length < 20) {
            labels.push(w)
            data.push(freqMap[w])
        }
        totalwords = totalwords + freqMap[w]
        totaldistinctwords++
    })
    return [labels, data, totalwords, totaldistinctwords];
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labels: [],
            data: [],
            totalwords: 0,
            totaldistinctwords: 0,
            display: false
        }
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            var output = wordFreq(text)
            console.log(output)
            this.setState({ labels: output[0], data: output[1], display: true, totalwords: output[2], totaldistinctwords: output[3] })
        };
        reader.readAsText(e.target.files[0])
    }
    readTxt = async () => {
        let url = "https://www.terriblytinytales.com/test.txt"

        let response = await fetch(url);
        const txt = await response.text().then((str) => {
            return str;
        });
        // console.log(txt)
        var output = wordFreq(txt)
        console.log(output)
        this.setState({ labels: output[0], data: output[1], display: true, totalwords: output[2], totaldistinctwords: output[3] })

    }
    render = () => {
        const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' }

        return (<div>
            {/* for localy chosing the file uncomment below line */}
            {/* <input type="file" onChange={(e) => this.showFile(e)} /> */}
            {
                this.state.display ?
                    <div>
                        <h2>Histogram of the 20 most occurring words.</h2>
                        <h3>Total words : {this.state.totalwords}</h3>
                        <h3>Total distinct words : {this.state.totaldistinctwords}</h3>
                        <Histogram
                            xLabels={this.state.labels}
                            yValues={this.state.data}
                            width='400'
                            height='200'
                            options={options}
                        />
                    </div> :
                    ""
            }
            <h3>Click on submit to render the frequency count of https://www.terriblytinytales.com/test.txt </h3>
            <button onClick={(e) => this.readTxt()}>Submit</button>
        </div>
        )
    }
}

export default App;