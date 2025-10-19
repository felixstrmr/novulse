type Props = React.SVGProps<SVGSVGElement>;

export function ProjectIcon(props: Props) {
  return (
    <svg
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>project-icon</title>
      <g fill="currentColor">
        <path d="M13.75,4.5h-4.279l-1.3-1.53c-.523-.616-1.288-.97-2.096-.97h-1.825c-1.517,0-2.75,1.233-2.75,2.75V12.75c0,1.517,1.233,2.75,2.75,2.75H13.75c1.517,0,2.75-1.233,2.75-2.75V7.25c0-1.517-1.233-2.75-2.75-2.75Z" />
      </g>
    </svg>
  );
}
