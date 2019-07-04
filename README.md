![ReactPlayer](./logo128x128.png)

# ReactPlayer

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
![reactjs-player](https://img.shields.io/npm/v/reactjs-player.svg?style=flat-square)
![reactjs-player](https://img.shields.io/bundlephobia/minzip/reactjs-player.svg?style=flat-square)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

基于 react hooks 的 video 播放组件，结构简单，代码简洁，扩展方便。

## 特点

`ReactPlayer` 遵循 `少即是多（Less is more）` 的设计原则，具有以下特点：

- 结构简单：使用 `react hooks` 做状态管理，将不同的状态拆分到不同的 `react custom hooks` 中，`ReactPlayer` 中进行组合
- 扩展方便：扩展时实现对应的 `react custom hooks` 并在 `ReactPlayer` 中根据条件进行加载
- 代码简洁：只做播放器内部的状态管理和控制栏显示与控制，Gzip 后只有 8KB
- 理解容易： `ReactPlayer` 事件基于 `vidoe` [媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events) 进行扩展，减小理解成本
- 使用相对复杂：不同于市面上其他的 h5 播放器，`ReactPlayer` 将控制权交给使用者，无法做到一行代码播放所有兼容的格式

## Getting started

```
git clone https://github.com/goblin-laboratory/react-player.git
cd react-player
yarn install
yarn start
```

## Usage

Demo page: [Demo](https://goblin-laboratory.github.io/react-player/)

```
npm install reactjs-player --save
# or
yarn add reactjs-player
```

```js
import React, { Component } from 'react';
import ReactPlayer from 'reactjs-player';

const App = () => {
  return <ReactPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" />;
};
```

### 常用场景说明

- hlsjs: 支持 MSE 的浏览器上播放录像

```jsx
<ReactPlayer
  kernel="hlsjs"
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- flvjs: 支持 MSE 与 networkStreamIO 的浏览器上播放直播

```jsx
<ReactPlayer kernel="flvjs" live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

- native: 原生支持 hls 的浏览器上播放录像（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={false}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- native: 原生支持 hls 的浏览器上播放直播（iOS/Android）

```jsx
<ReactPlayer
  kernel="native"
  live={true}
  src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
  type="application/x-mpegURL"
/>
```

- GrindPlayer: PC 端低版本浏览器播放录像

```jsx
<GrindPlayer live={false} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/rtmp" />
```

- GrindPlayer: PC 端低版本浏览器播放直播

```jsx
<GrindPlayer live={true} src="http://fms.cntv.lxdns.com/live/flv/channel89.flv" type="video/x-flv" />
```

## Props

props 参考 video 属性： https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#Attributes

| Prop           | Type     | Default | Description       |
| -------------- | -------- | ------- | ----------------- |
| `kernel`       | `Enum`   |         |                   |
| `live`         | `Bool`   |         |                   |
| `config`       | `Object` | `null`  | kernel config     |
| --             | --       | --      | --                |
| `src`          | `String` | `''`    |                   |
| `type`         | `String` |         |                   |
| `poster`       | `String` | `''`    |                   |
| `controls`     | `Enum`   | `true`  |                   |
| `muted`        | `Bool`   | `false` | Not supported yet |
| `autoPlay`     | `Bool`   | `true`  | Not supported yet |
| `loop`         | `Bool`   | `false` |                   |
| `playsInline`  | `Bool`   | `true`  |                   |
| --             | --       | --      | --                |
| `currentTime`  | `Number` | `0`     | Not supported yet |
| `volume`       | `Number` | `1.0`   | Not supported yet |
| `playbackRate` | `Number` | `1.0`   | Not supported yet |

**kernel**

| Value      | Description                                       |
| ---------- | ------------------------------------------------- |
| `'hlsjs'`  | use [hls.js](https://github.com/video-dev/hls.js) |
| `'flvjs'`  | use [flv.js](https://github.com/bilibili/flv.js)  |
| `'native'` | use native video                                  |

**controls**

| Value        | Description           |
| ------------ | --------------------- |
| `true`       | ReactPlayerSkin       |
| `false`      | without controls      |
| `'controls'` | video native controls |

<!-- ### Config props

| Prop          | Type     | Optional | Default | Description |
| ------------- | -------- | -------- | ------- | ----------- |
| `currentTime` | `Number` | `true`   | `0`     |             |
| `volume`      | `Number` | `true`   | `1.0`   |             | -->

### Callback props

[媒体事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)说明

| Prop               | Description                      |
| ------------------ | -------------------------------- |
| `onKernelError`    | fired when flv.js / hls.js error |
| --                 | --                               |
| `onCanPlay`        |                                  |
| `onDurationChange` |                                  |
| `onTimeUpdate`     |                                  |
| `onPause`          |                                  |
| `onPlay`           |                                  |
| `onPlaying`        |                                  |
| `onEnded`          |                                  |
| `onSeeked`         |                                  |
| `onSeeking`        |                                  |
| `onCanPlayThrough` |                                  |
| `onEmptied`        |                                  |
| `onEncrypted`      |                                  |
| `onError`          |                                  |
| `onLoadedData`     |                                  |
| `onLoadedMetadata` |                                  |
| `onLoadStart`      |                                  |
| `onProgress`       |                                  |
| `onRateChange`     |                                  |
| `onStalled`        |                                  |
| `onSuspend`        |                                  |
| `onVolumeChange`   |                                  |
| `onWaiting`        |                                  |
| `onAbort`          |                                  |

### 同层播放 Props

同层播放接入指南：

1. https://x5.tencent.com/tbs/guide/video.html
2. https://x5.tencent.com/tbs/guide/web/x5-video.html

| Prop                        | Type       | Default        | Description |
| --------------------------- | ---------- | -------------- | ----------- |
| `x5playsinline`             | `Bool`     | `false`        |             |
| `objectPosition`            | `String`   | `'center top'` |             |
| `onX5VideoFullscreenChange` | `Function` | `noop`         |             |

## Methods

暂未支持

| Method            | Return Type | Description |
| ----------------- | ----------- | ----------- |
| `isPlaying`       | `Bool`      |             |
| `isFullscreen`    | `Object`    |             |
| `getCurrentTime`  | `Number`    |             |
| `setCurrentTime`  | `Number`    |             |
| `getBuffered`     | `Object`    |             |
| `setPlaybackRate` | `Number`    |             |
| `getPlaybackRate` | `Number`    |             |
| `isPiP`           | `Bool`      |             |

### GrindPlayer

| Prop             | Type     | Default                                                   | Description |
| ---------------- | -------- | --------------------------------------------------------- | ----------- |
| `live`           | `Bool`   | `true`                                                    |             |
| `src`            | `String` | `''`                                                      |             |
| `type`           | `String` | `'video/rtmp'`                                            |             |
| `grindPlayerSwf` | `String` | `'https://unpkg.com/reactjs-player/dist/GrindPlayer.swf'` |             |
| `flashlsOSMFSwf` | `String` | `'https://unpkg.com/reactjs-player/dist/flashlsOSMF.swf'` |             |

### ReactPlayerContext

订阅 ReactPlayer 的 Context，必须在 ReactPlayer 的子组件中使用

```jsx
import React from 'react';
import ReactPlayer from 'reactjs-player';

const ReactPlayerContext = ReactPlayer.ReactPlayerContext;

const ReactPlayerChild = () => {
  const {
    src,
    loading,
    paused,
    waiting,
    seeking,
    ended,
    duration,
    currentTime,
    buffered,
    muted,
    volume,
    playbackRate,
    fullscreen,

    changeCurrentTime,
    onPauseClick,
    onPlayClick,
    onMutedClick,
    changeVolume,
    onPiPClick,
    requestFullscreen,
    exitFullscreen,
    changePlaybackRate,

    playerMsg,
  } = React.useContext(ReactPlayerContext);

  return <>{loading && <div>loading</div>}</>;
};

const App = () => {
  return (
    <ReactPlayer kernel="hlsjs" src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8">
      <ReactPlayerChild />
    </ReactPlayer>
  );
};
```

## Supported media

- HLS
- FLV
- RTMP

## 微信同层播放

待补充

## Contributing

非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😃：

- 通过 Issue 报告 bug 或进行咨询。
- 提交 Pull Request 。

## Licensing

ReactPlayer is [MIT licensed](./LICENSE).