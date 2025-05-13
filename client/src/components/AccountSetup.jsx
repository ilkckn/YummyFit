import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function AccountSetup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="account-setup h-[100vh]">
      <div className="container mx-auto max-w-[80%] py-20 px-15">
        <h2 className="text-3xl mb-6 lato-black">{t('account_setup.title')}</h2>
        <p className="text-lg mb-4 w-[65%]">
          {t('account_setup.welcome')} <b>{t('brand_name')}</b>{t('account_setup.welcome_message_rest')}
          <br />
          <br />
          {t('account_setup.get_started')}
          <br />
          {t('account_setup.personalization_message')}
        </p>
        <Link
          to={"/account-setup/food-preferences"}
          className="yummy-btn mt-10 px-4 py-2 inline-block lato-black"
        >
          {t('account_setup.get_started_button')}
        </Link>
        <p onClick={handleBackToHome} className="flex items-center gap-2 tracking-[-.5px] mt-5 cursor-pointer">
          <IoReturnUpBackOutline className="text-[1.3rem] text-[#FE486E]" />
          {t('account_setup.back_to_home')}
        </p>
      </div>
    </div>
  );
}

export default AccountSetup;
