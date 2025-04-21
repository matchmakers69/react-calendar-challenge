import { t } from "@/shared/locales";

type FooterTextProps = {
	businessName: string;
};

function SidebarFooterText({ businessName }: FooterTextProps) {
	const currentYear = new Date().getFullYear();

	return (
		<span
			className="text-xs text-dark-grey"
			role="contentinfo"
			aria-label={`Copyright ${currentYear} ${businessName}`}
		>
			&copy; {currentYear} {businessName}. {t.sidebar.copyright}.
		</span>
	);
}
export { SidebarFooterText };
