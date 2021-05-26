import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import db from "./../config";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      definition: [],
      lexicalCategory: [],
      test: "loading.....",
    };
  }

  search = (wordSearched) => {
    var word = wordSearched.toLowerCase().trim();
    this.setState({
      word: word,
    });
    var jsonResponse = db[word];
    var definitionData = [];
    var lexicalData = [];
    jsonResponse
      ? jsonResponse.definition
        ? (
          definitionData = jsonResponse.definition,
          lexicalData.push(jsonResponse.lexicalCategory))
        : definitionData.push(jsonResponse)
      : definitionData.push("This word is not in the dictionary");
    console.log(jsonResponse),
      console.log(jsonResponse),

      this.setState({
        definition: definitionData,
        lexicalCategory: lexicalData,
      });
  };

  wordSearchedText(input) {
    if (input) {
      return "Search Keyword: " + input;
    } else {
      return "";
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <TextInput
          inlineImageLeft="search_icon"
          inlineImagePadding={100}
          style={styles.input}
          placeholder="Enter Word Here"
          keyboardType="default"
          maxLength={30}
          caretHidden={true}
          blurOnSubmit={true}
          autoFocus={true}
          inlineImageLeft='search_icon'
          onChangeText={(data) => {
            this.setState({
              word: data,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.state.word) {
              this.search(this.state.word);
            }
          }}
        >
          <Icon reverse name="search" color="#eeaa66" reverseColor="#000" />
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
        <View style={styles.wordDetail}>
          <Text
            style={{
              color: "#888",
              fontSize: 15,
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            {this.wordSearchedText(this.state.word)}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            margin: 20,
            paddingBottom: 30,
            flexGrow: 1,
          }}
        >
          {this.state.definition.map((indexData, indexNum) => {
            return (
              <TouchableOpacity
                key={indexNum + "touch"}
                style={styles.scrollContainer}
              >
                <Text
                  style={[styles.textMapped, { fontSize: 25, marginBottom: 0 }]}
                  key={indexNum + "text1"}
                >
                  {this.state.definition.[indexNum]}
                </Text>
                <Text
                  style={[
                    styles.textMapped,
                    { fontSize: 15, marginLeft: 20, color: "#faa" },
                  ]}
                  key={indexNum + "text2"}
                >
                  {this.state.lexicalCategory[indexNum]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "#212121",
  },
  input: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    textAlign: "center",
    borderWidth: 3,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#eeaa66",
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 20,
    flexDirection: "row",
  },
  text: {
    marginRight: 20,
  },
  wordDetail: {
    margin: 30,
  },
  textMapped: {
    margin: 20,
    color: "#afa",
  },
  scrollContainer: {
    backgroundColor: "#000",
    borderRadius: 20,
    marginTop: 20,
  },
});
