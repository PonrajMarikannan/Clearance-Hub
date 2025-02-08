import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCamera,
	faCannabis,
	faRandom,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { faAsymmetrik } from "@fortawesome/free-brands-svg-icons";

const serviceList = [
	{
		icon: faCannabis,
		title: "Product Design",
		description:
			"Banks likewise put away cash to develop their hold of cash. What they do is directed by laws. Those laws vary in various nations",
	},
	{
		icon: faRandom,
		title: "Content Marketing",
		description:
			"Banks likewise put away cash to develop their hold of cash. What they do is directed by laws. Those laws vary in various nations",
	},
	{
		icon: faCamera,
		title: "Digital Strategy",
		description:
			"Banks likewise put away cash to develop their hold of cash. What they do is directed by laws. Those laws vary in various nations",
	},
	{
		icon: faAsymmetrik,
		title: "Get your documentation",
		description:
			"Banks likewise put away cash to develop their hold of cash. What they do is directed by laws. Those laws vary in various nations",
	},
];

const ServiceItem = ({ service }) => (
	<div className="bg-white dark:bg-slate-800 shadow h-full p-3 md:mt-4">
		<div className="p-4 lg:p-8">
			<div className="text-[40px] text-blue-600 mb-2">
				<FontAwesomeIcon icon={service.icon} />
			</div>
			<h5 className="text-xl font-medium my-6">{service.title}</h5>
			<p className="opacity-75 mt-4">{service.description}</p>
		</div>
	</div>
);

ServiceItem.propTypes = {
	service: PropTypes.object.isRequired,
};

function ShapeOne() {
	return (
		<svg
			className="absolute -bottom-[20%] left-0 -z-[1]"
			width="405"
			height="626"
			viewBox="0 0 405 626"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="-302.65"
				y="296.986"
				width="433.92"
				height="140"
				rx="73.8464"
				transform="rotate(-33.796 -302.65 296.986)"
				fill="#7434F8"
				fillOpacity="0.5"
			/>
			<rect
				x="-315"
				y="502.403"
				width="666.584"
				height="140"
				rx="73.8464"
				transform="rotate(-33.796 -315 502.403)"
				fill="#FAA515"
				fillOpacity="0.5"
			/>
		</svg>
	);
}

function ShapeTwo() {
	return (
		<svg
			className="absolute -top-[20%] right-0 -z-[1]"
			width="340"
			height="658"
			viewBox="0 0 495 778"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="389" cy="389" r="389" fill="#0d6efd" fillOpacity="0.19" />
		</svg>
	);
}

const Service = () => {
	return (
		<section className="ezy__service20 light py-14 md:py-24 bg-gray-50 dark:bg-[#0b1727] text-zinc-900 dark:text-white relative z-[1] overflow-hidden">
			<ShapeOne />
			<ShapeTwo />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-4">
						<h2 role="text" className="text-3xl md:text-[40px] font-bold leading-normal mb-4">
							The Best Stories are told in the desert. What Noman known for...
						</h2>
						<p role="content" className="text-[17px] leading-normal opacity-80">
							An activity that requires a person's mental or physical effort is
							work.If a person is trained for a certain type physical effort.
						</p>
					</div>
					<div className="col-span-12 md:col-span-8">
						<div className="grid grid-cols-2 gap-6 gap-x-5">
							<div className="col-span-2 md:col-span-1">
								{serviceList.slice(0, 2).map((service, i) => (
									<div key={i}>
										<ServiceItem service={service} />
									</div>
								))}
							</div>

							<div className="col-span-2 md:col-span-1 md:mt-12">
								{serviceList.slice(2, 4).map((service, i) => (
									<div key={i}>
										<ServiceItem service={service} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


export default Service