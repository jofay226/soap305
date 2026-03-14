export default function GrowingPlant() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-green-100 p-6">
      <div className="rounded-3xl bg-white/70 shadow-2xl p-6">
        <svg
          viewBox="0 0 300 420"
          className="w-[280px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* pot */}
          <ellipse
            cx="150"
            cy="350"
            rx="62"
            ry="14"
            fill="#7c4a2d"
            opacity="0.25"
          />
          <path d="M100 270 H200 L185 350 H115 Z" fill="#b86b3d" />
          <ellipse cx="150" cy="270" rx="50" ry="10" fill="#d9844f" />
          <ellipse cx="150" cy="273" rx="42" ry="8" fill="#5a3825" />

          {/* stem */}
          <path
            d="M150 270 C150 235, 148 210, 150 180 C152 145, 155 120, 150 90"
            fill="none"
            stroke="#2f9e44"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="220"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="220;0;0;220"
              keyTimes="0;0.45;0.75;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>

          {/* leaf 1 left */}
          <g>
            <path
              d="M150 210 C120 192, 112 170, 130 154 C148 164, 156 186, 150 210 Z"
              fill="#37b24d"
              transform="translate(0 0) scale(0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="150 185;150 185;150 185;150 185"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                additive="sum"
                type="scale"
                values="0;1;1;0"
                keyTimes="0;0.3;0.75;1"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* leaf 1 right */}
          <g>
            <path
              d="M150 192 C178 178, 190 158, 172 142 C154 152, 147 170, 150 192 Z"
              fill="#40c057"
              transform="translate(0 0) scale(0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="150 167;150 167;150 167;150 167"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                additive="sum"
                type="scale"
                values="0;0;1;1;0"
                keyTimes="0;0.15;0.4;0.75;1"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* leaf 2 left */}
          <g>
            <path
              d="M150 155 C124 140, 114 120, 128 104 C145 112, 151 130, 150 155 Z"
              fill="#37b24d"
              transform="translate(0 0) scale(0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="150 130;150 130;150 130;150 130"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                additive="sum"
                type="scale"
                values="0;0;1;1;0"
                keyTimes="0;0.25;0.5;0.75;1"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* leaf 2 right */}
          <g>
            <path
              d="M150 136 C176 122, 186 102, 170 88 C154 97, 148 114, 150 136 Z"
              fill="#4cd964"
              transform="translate(0 0) scale(0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="150 112;150 112;150 112;150 112"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                additive="sum"
                type="scale"
                values="0;0;0;1;1;0"
                keyTimes="0;0.3;0.4;0.55;0.75;1"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* flower */}
          <g opacity="0">
            <animate
              attributeName="opacity"
              values="0;0;1;1;0"
              keyTimes="0;0.45;0.58;0.75;1"
              dur="6s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="150 78;150 78;150 78"
              dur="6s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="scale"
              values="0.2;0.2;1;1;0.2"
              keyTimes="0;0.45;0.58;0.75;1"
              dur="6s"
              repeatCount="indefinite"
            />

            <circle cx="0" cy="0" r="14" fill="#ffd43b" />
            <circle cx="-18" cy="0" r="12" fill="#f783ac" />
            <circle cx="18" cy="0" r="12" fill="#f783ac" />
            <circle cx="0" cy="-18" r="12" fill="#faa2c1" />
            <circle cx="0" cy="18" r="12" fill="#faa2c1" />
            <circle cx="-12" cy="-12" r="11" fill="#fcc2d7" />
            <circle cx="12" cy="-12" r="11" fill="#fcc2d7" />
          </g>
        </svg>
      </div>
    </div>
  );
}
