/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

import useVideoState from '@reactjs-player/use-state';
import useTime from '@reactjs-player/use-time';
import useVolume from '@reactjs-player/use-volume';
import usePlaybackRate from '@reactjs-player/use-playback-rate';
import usePiP from '@reactjs-player/use-pip';
import useFullscreen from '@reactjs-player/use-fullscreen';

// import useHlsjs from '@reactjs-player/use-hlsjs';
// import useFlvjs from '@reactjs-player/use-flvjs';
// import useNative from '@reactjs-player/use-native';

import Flvjs from '../Flvjs';
import Hlsjs from '../Hlsjs';
import Native from '../Native';
import ReactPlayerSkinWapper from '../ReactPlayerSkinWapper';
import ReactPlayerContext from '../ReactPlayerContext';
import styles from './index.module.less';

const noop = () => {};

const ReactPlayer = (
  {
    kernel,

    live,

    config = null,
    onKernelError = noop,

    src = '',
    type,
    controls = true,
    poster = '',
    muted = false,
    // autoPlay = true,

    className = '',
    videoProps = null,
    playerProps = null,

    onCanPlay = noop,
    onDurationChange = noop,
    onTimeUpdate = noop,
    onPause = noop,
    onPlay = noop,
    onPlaying = noop,
    onEnded = noop,
    onSeeked = noop,
    onSeeking = noop,
    onCanPlayThrough = noop,
    onEmptied = noop,
    onEncrypted = noop,
    onError = noop,
    onLoadedData = noop,
    onLoadedMetadata = noop,
    onLoadStart = noop,
    onProgress = noop,
    onRateChange = noop,
    onStalled = noop,
    onSuspend = noop,
    onVolumeChange = noop,
    onWaiting = noop,
    onAbort = noop,

    onFullscreenChange = noop,

    children = null,
  },
  ref,
) => {
  const [kernelMsg, setKernelMsg] = React.useState(null);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const getVideoElement = React.useCallback(() => videoRef && videoRef.current, []);
  const getPlayerElement = React.useCallback(() => playerRef && playerRef.current, []);
  const onMsgChange = React.useCallback(
    msg => {
      setKernelMsg(msg);
      onKernelError(msg);
    },
    [onKernelError],
  );

  const stateProps = useVideoState(
    {
      src,
      onCanPlay,
      onPause,
      onPlay,
      onPlaying,
      onEnded,
      onSeeked,
      onSeeking,
      onCanPlayThrough,
      onWaiting,
    },
    getVideoElement,
  );
  const timeProps = useTime({ src, onDurationChange, onTimeUpdate, onProgress }, getVideoElement);
  const volumeProps = useVolume({ muted, onVolumeChange }, getVideoElement);
  const playbackRateProps = usePlaybackRate({ live, onRateChange }, getVideoElement);
  const piPProps = usePiP({ src }, getVideoElement);
  const fullscreenProps = useFullscreen({ onFullscreenChange }, getVideoElement, getPlayerElement);

  React.useImperativeHandle(ref, () => ({
    isPlaying: () => !!src && !(stateProps.loading || stateProps.waiting || stateProps.ended || stateProps.paused),
    getDuration: () => timeProps.duration,
    getCurrentTime: () => timeProps.currentTime,
    setCurrentTime: ct => timeProps.changeCurrentTime(ct),
    getBuffered: () => timeProps.buffered,
    getVolume: () => volumeProps.volume,
    setVolume: v => volumeProps.changeVolume(v),
    isMuted: () => volumeProps.muted,
    toggleMute: () => volumeProps.onMutedClick(),
    getPlaybackRate: () => playbackRateProps.playbackRate,
    setPlaybackRate: rate => playbackRateProps.changePlaybackRate(rate),
    isPiP: () => piPProps.pictureInPictureEnabled && piPProps.pip,
    isFullscreen: () => fullscreenProps.fullscreen,
  }));

  const kernelProps = { getVideoElement, src, config, onMsgChange };

  return (
    <div className={`${styles.reactPlayer} ${className}`} ref={playerRef} {...playerProps}>
      {'flvjs' === kernel && <Flvjs {...kernelProps} />}
      {'hlsjs' === kernel && <Hlsjs {...kernelProps} />}
      {'native' === kernel && <Native {...kernelProps} />}
      <video
        className={styles.video}
        ref={videoRef}
        controls={'controls' === controls}
        type={type}
        {...videoProps}
        // useVideoState
        onCanPlay={stateProps.onCanPlay}
        onPause={stateProps.onPause}
        onPlay={stateProps.onPlay}
        onPlaying={stateProps.onPlaying}
        onEnded={stateProps.onEnded}
        onSeeked={stateProps.onSeeked}
        onSeeking={stateProps.onSeeking}
        onCanPlayThrough={stateProps.onCanPlayThrough}
        onWaiting={stateProps.onWaiting}
        // useTime
        onDurationChange={timeProps.onDurationChange}
        onTimeUpdate={timeProps.onTimeUpdate}
        onProgress={timeProps.onProgress}
        // useVolume
        muted={volumeProps.muted}
        onVolumeChange={volumeProps.onVolumeChange}
        // usePlaybackRate
        onRateChange={playbackRateProps.onRateChange}
        // 未处理媒体事件
        onEmptied={onEmptied}
        onEncrypted={onEncrypted}
        onError={onError}
        onLoadedData={onLoadedData}
        onLoadedMetadata={onLoadedMetadata}
        onLoadStart={onLoadStart}
        onStalled={onStalled}
        onSuspend={onSuspend}
        onAbort={onAbort}
      />
      <ReactPlayerContext.Provider
        value={{
          getVideoElement,
          live,
          src,
          controls,
          poster,
          // useVideoState
          loading: stateProps.loading,
          prevented: stateProps.prevented,
          paused: stateProps.paused,
          ended: stateProps.ended,
          seeking: stateProps.seeking,
          waiting: stateProps.waiting,
          onPauseClick: stateProps.onPauseClick,
          onPlayClick: stateProps.onPlayClick,
          // useTime
          duration: timeProps.duration,
          currentTime: timeProps.currentTime,
          buffered: timeProps.buffered,
          changeCurrentTime: timeProps.changeCurrentTime,
          // useVolume
          muted: volumeProps.muted,
          volume: volumeProps.volume,
          onMutedClick: volumeProps.onMutedClick,
          changeVolume: volumeProps.changeVolume,
          // usePlaybackRate
          playbackRate: playbackRateProps.playbackRate,
          changePlaybackRate: playbackRateProps.changePlaybackRate,
          ...piPProps,
          ...fullscreenProps,
          kernelMsg,
        }}
      >
        {true === controls && <ReactPlayerSkinWapper />}
        {children}
      </ReactPlayerContext.Provider>
    </div>
  );
};

// FIXME: index.js:1437 Warning: forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?
ReactPlayer.propTypes = {
  kernel: PropTypes.oneOf(['hlsjs', 'flvjs', 'native']).isRequired,
  live: PropTypes.bool.isRequired,
  config: PropTypes.object,
  onKernelError: PropTypes.func,

  src: PropTypes.string,
  type: PropTypes.string.isRequired,
  controls: PropTypes.oneOf([false, true, 'controls']),
  poster: PropTypes.string,
  muted: PropTypes.bool,
  // autoPlay: PropTypes.bool,

  className: PropTypes.string,
  videoProps: PropTypes.object,
  playerProps: PropTypes.object,

  onCanPlay: PropTypes.func,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaying: PropTypes.func,
  onEnded: PropTypes.func,
  onSeeked: PropTypes.func,
  onSeeking: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEmptied: PropTypes.func,
  onEncrypted: PropTypes.func,
  onError: PropTypes.func,
  onLoadedData: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onLoadStart: PropTypes.func,
  onProgress: PropTypes.func,
  onRateChange: PropTypes.func,
  onStalled: PropTypes.func,
  onSuspend: PropTypes.func,
  onVolumeChange: PropTypes.func,
  onWaiting: PropTypes.func,
  onAbort: PropTypes.func,

  onFullscreenChange: PropTypes.func,

  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ReactPlayer.defaultProps = {
  config: null,
  onKernelError: noop,
  // onPlayPrevented: noop,
  // getCustomHooks: noop,

  src: '',
  controls: true,
  poster: '',
  muted: false,
  // autoPlay: true,

  className: '',
  videoProps: null,
  playerProps: null,

  onCanPlay: noop,
  onDurationChange: noop,
  onTimeUpdate: noop,
  onPause: noop,
  onPlay: noop,
  onPlaying: noop,
  onEnded: noop,
  onSeeked: noop,
  onSeeking: noop,
  onCanPlayThrough: noop,
  onEmptied: noop,
  onEncrypted: noop,
  onError: noop,
  onLoadedData: noop,
  onLoadedMetadata: noop,
  onLoadStart: noop,
  onProgress: noop,
  onRateChange: noop,
  onStalled: noop,
  onSuspend: noop,
  onVolumeChange: noop,
  onWaiting: noop,
  onAbort: noop,

  onFullscreenChange: noop,

  children: null,
};

export default React.forwardRef(ReactPlayer);