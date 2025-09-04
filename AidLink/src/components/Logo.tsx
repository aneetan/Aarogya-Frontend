import AarogyaLogo from "../assets/image/logo.png"
import AarogyaNameLogo from '../assets/image/logo-name.png'

interface LogoProps {
   isName: boolean;
}
const Logo: React.FC<LogoProps> = ({isName}) => {
  return (
    <>
     {isName ? (
      <img src={AarogyaNameLogo} alt="Aarogya Name Logo" className="h-12" />
     ): (
      <img src={AarogyaLogo} alt="Aarogya Logo" />
     )}
    </>
  )
}

export default Logo
