import { ButtonLink } from '../Button';

export default function EmailNotVerified({ error }) {
  return (
    <div className="flex flex-col items-center pb-5">
      <div className="m-4 font-bold text-white">Please check the subscription link in your email</div>
      <div className="mt-0 m-4 flex p-4 mb-4 text-sm text-blue-800 rounded-sm bg-blue-300 " role="alert">
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium text-blue-900">
            You need to subscribe before you can use the application.
          </span>
        </div>
      </div>
      <div className="m-4 mt-4 text-sm text-gray-400">
        Look for an email sent with the subject "Start a subscription" sent from "OnMachina Billing".
        That email contains a link you can click to proceed with a subscription.
      </div>
      <div className="p-4 pb-0 w-full">
        <ButtonLink bg="active" onClick="{() => window.location.reload()}">
          Check again
        </ButtonLink>
      </div>
    </div>
  );
}
