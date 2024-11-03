import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './Invite.module.css';

function Invite({ recipientEmail }) {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Recipient Email: ", recipientEmail);

    const fetchInvites = async () => {
      if (!recipientEmail) {
        console.error("Recipient email is not defined");
        setLoading(false);
        return;
      }

      try {
        const invitesCollection = collection(db, 'invites');
        const q = query(invitesCollection, where('recipientEmail', '==', recipientEmail));
        const invitesSnapshot = await getDocs(q);

        if (invitesSnapshot.empty) {
          console.log("No invites found for this email");
          setInvites([]);
        } else {
          const invitesList = invitesSnapshot.docs.map((inviteDoc) => {
            const inviteData = inviteDoc.data();
            return {
              id: inviteDoc.id,
              recipientEmail: inviteData.recipientEmail,
              senderEmail: inviteData.senderEmail,
              role: inviteData.role,
              status: inviteData.status,
            };
          });
          setInvites(invitesList);
        }
      } catch (err) {
        console.error("Error fetching invites: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, [recipientEmail]);

  if (loading) {
    return <div>Loading invites...</div>;
  }

  if (error) {
    return <div>Error loading invites: {error.message}</div>;
  }

  return (
    <div>
      {invites.length > 0 ? (
        invites.map((invite) => (
          <div key={invite.id} className={styles['notification-content']}>
            <div className={styles['user-info-wrapper']}>
              <div className={styles['user-header']}>
                <p className={styles['user-name']}>
                  {invite.senderEmail}
                </p>
                <p className={styles['user-role']}>{invite.role}</p>
              </div>
              <p className={styles['invite-msg']}>
                Hi! You were invited to {invite.senderEmail}&apos;s team.
              </p>
            </div>
            <div className={styles['action-wrapper']}>
              <button className={styles['accept-btn']}>Accept</button>
              <button className={styles['decline-btn']}>Decline</button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles['no-inv']}>No invites available.</div>
      )}
    </div>
  );
}

Invite.propTypes = {
  recipientEmail: PropTypes.string.isRequired,
};

export default Invite;
