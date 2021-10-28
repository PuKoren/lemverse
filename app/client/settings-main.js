Template.settingsMain.events({
  'input .js-name'(event) {
    event.preventDefault();
    event.stopPropagation();
    const name = event.target.value;
    if (!name) return false;

    Meteor.users.update(Meteor.userId(), { $set: { 'profile.name': name } });
    userManager.rename(name);
    return false;
  },
  'input .js-reaction'(event) {
    event.preventDefault();
    event.stopPropagation();
    const reaction = event.target.value;
    if (!reaction) return false;

    Meteor.users.update(Meteor.userId(), { $set: { 'profile.defaultReaction': reaction } });
    return false;
  },
  'click .js-copy-invitation'(event) {
    event.preventDefault();
    event.stopPropagation();

    const { levelId } = Meteor.user().profile;
    const levelIdWithoutPrefix = levelId.substring(levelId.lastIndexOf('_') + 1);

    const path = FlowRouter.path('invite', { levelId: levelIdWithoutPrefix });
    const url = `${window.location.host}${path}`;
    navigator.clipboard.writeText(url).then(() => lp.notif.success('✂️ Invitation copied to your clipboard'));

    return false;
  },
});