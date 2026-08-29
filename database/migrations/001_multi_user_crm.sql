-- Apply this migration once to databases created by the original assessment schema.
-- Existing contacts and campaigns must be assigned to a legitimate owner before
-- making user_id mandatory. This migration fails safely rather than assigning
-- legacy CRM data to an arbitrary account.

ALTER TABLE contacts ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS messages_sent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS converted_contacts INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS campaign_contacts (
  campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (campaign_id, contact_id)
);

CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_user_email
  ON contacts(user_id, email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaign_contacts_contact_id ON campaign_contacts(contact_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM contacts WHERE user_id IS NULL)
     OR EXISTS (SELECT 1 FROM campaigns WHERE user_id IS NULL) THEN
    RAISE EXCEPTION 'Assign each legacy contact and campaign to its owner before applying 001_multi_user_crm.sql.';
  END IF;
END $$;

ALTER TABLE contacts ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE campaigns ALTER COLUMN user_id SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contacts_user_id_fkey') THEN
    ALTER TABLE contacts ADD CONSTRAINT contacts_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'campaigns_user_id_fkey') THEN
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END $$;
