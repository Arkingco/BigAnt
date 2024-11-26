import ProfileSidebar from '../component/profile/ProfileSidebar';

export default function layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-row">
			<div className="w-[70%]">{children}</div>
			<div className="w-[30%]">
				<ProfileSidebar />
			</div>
		</div>
	);
}
