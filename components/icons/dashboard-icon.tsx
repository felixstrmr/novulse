type Props = React.SVGProps<SVGSVGElement>;

export function DashboardIcon(props: Props) {
  return (
    <svg
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>dashboard-icon</title>
      <g fill="currentColor">
        <path
          clipRule="evenodd"
          d="M10.0591 1.36312C9.4333 0.886573 8.56694 0.887449 7.94127 1.36281L2.69155 5.3526C2.2559 5.68346 2 6.19867 2 6.746V14.25C2 15.7692 3.23079 17 4.75 17H13.25C14.7692 17 16 15.7692 16 14.25V6.746C16 6.20008 15.7448 5.68398 15.3088 5.35288L10.0591 1.36312Z"
          fillOpacity="0.4"
          fillRule="evenodd"
        />
        <path d="M11.5 13.5V17H6.5V13.5C6.5 12.1193 7.61929 11 9 11C10.3807 11 11.5 12.1193 11.5 13.5Z" />
      </g>
    </svg>
  );
}
