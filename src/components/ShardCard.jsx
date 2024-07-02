import { Link } from 'react-router-dom';
import { ButtonLink } from '../components/Button';

export default function ShardCard({ name, decsription, url, isActive }) {
  if (isActive)
    return (
      <div className="max-w-sm bg-ui-active shadow">
        <a href="#">{/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}</a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
          </a>
          <p className="mb-6 font-normal text-gray-300 ">{decsription}</p>
          <ButtonLink bg="active" variant="arrow" to={url}>
            Select shard
          </ButtonLink>
        </div>
      </div>
    );

  // diaabled card view
  return (
    <div className="max-w-sm bg-ui-active opacity-50 shadow ">
      <a href="#">{/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}</a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-400 ">
            {name}
            <span className="ml-2 bg-cyan-300 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">Soon</span>
          </h5>
        </a>
        <p className="mb-6 font-normal text-gray-400 ">{decsription}</p>
        <ButtonLink bg="active" variant="arrow" to="#">
          Select shard
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </ButtonLink>
      </div>
    </div>
  );
}
