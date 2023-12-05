function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getRecommendation(mobilePlatform, desktopPlatform, preference) {
    var recommendedAppMobile = mobilePlatform === 'apple' ? 'Damus' : 
                               mobilePlatform === 'BlackBerry' ? 'Nostter(web)' : 'Amethyst or Plebstr';

    var recommendedAppDesktop = desktopPlatform === 'windows' ? 'Nostter or Gossip' : 
                                desktopPlatform === 'mac' ? 'more-speech or Coracle' : 
                                desktopPlatform === 'chromeos' ? 'Lume' : 'Coracle';

    if (preference === 'mobile') {
        return recommendedAppMobile;
    } else if (preference === 'desktop') {
        return recommendedAppDesktop;
    } else if (preference === 'halfhalf') {
        return recommendedAppMobile + ' and ' + recommendedAppDesktop;
    } else {
        return 'Coracle';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-button').addEventListener('click', function() {
        var selectedMobilePlatform = document.getElementById('mobile-platform').value;
        var selectedDesktopPlatform = document.getElementById('desktop-platform').value;
        var selectedPreference = document.getElementById('preference').value;

        // Setting cookies
        setCookie('selectedMobilePlatform', selectedMobilePlatform, 1);
        setCookie('selectedDesktopPlatform', selectedDesktopPlatform, 1);
        setCookie('selectedPreference', selectedPreference, 1);

        // Calculate the recommendation
        var recommendation = getRecommendation(selectedMobilePlatform, selectedDesktopPlatform, selectedPreference);
        console.log('Recommendation:', recommendation);

        // Optionally, display the recommendation on the page
        document.getElementById('recommendation-result').textContent = 'We recommend using: ' + recommendation + ' for Nostr.';
    });
});
