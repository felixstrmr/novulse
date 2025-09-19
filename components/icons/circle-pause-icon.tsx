type Props = React.SVGProps<SVGSVGElement>;

export function CirclePauseIcon(props: Props) {
  return (
    <svg
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>circle-pause-icon</title>
      <g fill="currentColor">
        <circle cx="9" cy="9" opacity=".4" r="8" strokeWidth="0" />
        <path
          d="m6.75,12.5c-.4141,0-.75-.3359-.75-.75v-5.5c0-.4141.3359-.75.75-.75s.75.3359.75.75v5.5c0,.4141-.3359.75-.75.75Z"
          strokeWidth="0"
        />
        <path
          d="m11.25,12.5c-.4141,0-.75-.3359-.75-.75v-5.5c0-.4141.3359-.75.75-.75s.75.3359.75.75v5.5c0,.4141-.3359.75-.75.75Z"
          strokeWidth="0"
        />
      </g>
    </svg>
  );
}
