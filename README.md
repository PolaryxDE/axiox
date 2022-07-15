# axiox [![Npm package version](https://badgen.net/npm/v/@dasdarki/axiox)](https://npmjs.com/package/@dasdarki/axiox)
Axoix is an enhancement for [axios](https://github.com/axios/axios) which adds features like simpler error handling.

```shell
npm i @dasdarki/axiox axios
```

## Usage
Import Axiox function from the library:
```js
import Axiox from '@dasdarki/axiox';
```

Create axios instance (optional):
```js
const axios = axios.create({});
```

Initialize Axiox Client:
```js
const axioxClient = Axiox(axios);
```

Make a request:
```js
axioxClient.get('https://api.some-url.com/some-path')
  .then(response => {
    // next step
  })
  .catch(error => {
    console.log(error);
  });
```

Handle the response with conditional response handling:
```js
response.when()
    .success(() => { /* SUCCESS (status code >= 200) */ })
    .and(c => c.status(400).data('message', 'Username does not exist'), () => { /* BAD REQUEST */ })
    .and(c => c.status(400).data('message', 'Email does not exist'), () => { /* BAD REQUEST */ })
```

## Credits
- [axios](https://github.com/axios) for creating the axios REST client
