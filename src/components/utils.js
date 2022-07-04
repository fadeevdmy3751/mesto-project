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

// export default class RefreshProfile {
//   constructor(name=null, about = null, avatar = null){
//     this._name = name;
//     this._about = about;
//     this._avatar = avatar
//   }
//   profile () {
//     if(this._name)
//       profileName.textContent = this._name
//     if(this._about)
//       profileDescription.textContent = this._about
//     if(this._avatar)
//       profileAva.style.backgroundImage = `url('${this._avatar}')`;
//   }
// }
