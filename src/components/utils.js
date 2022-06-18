const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAva = document.querySelector('.profile__avatar')

export function refreshProfile(name=null, about = null, avatar = null){
  if(name)
    profileName.textContent = name
  if(about)
    profileDescription.textContent = about
  if(avatar)
    profileAva.style.backgroundImage = `url('${avatar}')`;
}
