import Embed from "react-embed";

// TODO - Most embed types don't work???
export default function DisplayLink({ data }) {
	return <Embed url={data} />;
}
