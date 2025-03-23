import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../css/style.css'

function Footer(){
  return(
  <section id='footer'>
     <footer>
         <div className="footer-col">
             <h3>Pour les SENIORS</h3>
             <li>Intégration web</li>
             <li>Intégration mobile</li>
             <li>Machine Learning</li>
             <li>Cybersécurité</li>
         </div>
         <div className="footer-col">
             <h3>Pour les intermédiaires</h3>
             <li>Intégration web</li>
             <li>Intégration mobile</li>
             <li>Machine Learning</li>
             <li>Cybersécurité</li>
        </div>
         <div className="footer-col">
             <h3>Pour les JUNIORS</h3>
             <li>Intégration web</li>
             <li>Intégration mobile</li>
             <li>Machine Learning</li>
             <li>Cybersécurité</li>
         </div>
         <div className="copyright">
             <p>Copyright ©2024 All rights reserved .</p>
             <div className="pro-links">
             <FontAwesomeIcon icon={faFacebookF} className="i"/>
            <FontAwesomeIcon icon={faInstagram} className="i"/>
            <FontAwesomeIcon icon={faLinkedinIn} className="i"/>
          </div>
        </div>
        </footer>
      </section>
  )
}
export default Footer;