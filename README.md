
# ChatGPT Clone

A ChatGPT clone using OpenAI's API. Made with React and NodeJS.


## Installation

To install the project's dependencies run this command :

```bash
  npm install
```



## Available Scripts

In the project directory, you can run :

```bash
  npm start
```

## API Reference

### Get item

```http
  GET https://api.openai.com/v1/chat/completions
```
#### Header
| Parameter | Type     | value                       |
| :-------- | :------- | :-------------------------------- |
| `Content-Type`      | `string` | application/json |
| `Authorization`      | `string` | "Bearer " + apiKey |


#### Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `model`      | `string` | gpt-3.5-turbo |
| `messages`      | `string` | messages |
| `max_token`      | `number` | 512 |
| `temperature`      | `number` | 0.7 |
| `top_p`      | `number` | 0.9 |


