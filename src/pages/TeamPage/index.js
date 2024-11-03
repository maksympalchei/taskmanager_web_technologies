import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Sidebar from '../../modules/Sidebar';
import styles from './index.module.css';
import { auth, db } from '../../firebase';
import {getDoc, doc } from 'firebase/firestore';
import fetchData from '..//..//hooks/useFetch';
function TeamPage(props) {
  const [userId,setUserId] = useState('');
  const [teamId, setTeamId] = useState('');
  const {getUserByEmail, addInvite } = fetchData('users');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Developer');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.uid);
        await fetchUserTeam(user.uid);
      } else {
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserTeam = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userTeamId = userData.teamId;
        console.log("User's teamId:", userTeamId);

        setTeamId(userTeamId); 
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user team:", error);
    }
  };
  const sendInvite = async () => {
    console.log("New member email:", newMemberEmail);
    console.log("TeamId:", teamId);
    console.log("Function sendInvite started"); 
    if (!newMemberEmail || !teamId) {
      console.log("Email or teamId missing");
      return;
    }

    try {
      console.log("Checking if user exists:", newMemberEmail);
      const existingUser = await getUserByEmail(newMemberEmail);
      console.log("Existing User:", existingUser);

      if (existingUser) { 
        await addInvite({ 
          senderEmail: auth.currentUser.email,
          recipientEmail: newMemberEmail,
          role: selectedRole,
          teamId: teamId,
          status: 'pending',
        });

        setNewMemberEmail('');
        console.log("Invite successfully sent.");
      } else {
        alert('Цей користувач не існує.');
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };
  return (
    <section className={cn(styles['dashboard-section'], props.className, 'team-page')}>
      <div className={styles['main-container']}>
        <Sidebar />
        <article className={styles['main-content']}>
          <div className={styles['invite-panel']}>
            <div className={styles.flex_col}>
              <p className={styles['panel-title']}>Add new member</p>

              <div className={styles.flex_row}>
                <input
                  type="text"
                  className={styles['input-field']}
                  placeholder="Enter member email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
                <select className={styles['input-field']} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="HR">HR</option>
                  <option value="Designer">Designer</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                </select>
                <button className={styles['invite-btn']} onClick={sendInvite}>
                  Send invite
                </button>
              </div>
            </div>
          </div>

          <div className={styles['team-panel']}>
            <div className={styles.content_box2}>
              <p className={styles['team-title']}>My Team</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

TeamPage.propTypes = {
  className: PropTypes.string,
};

export default TeamPage;